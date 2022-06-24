# import Http Response from django
from django.shortcuts import render
from rest_framework.views import APIView
from api.models import *
from api.serializers import *
from django.http import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser
import pickle
import pandas as pd
import tensorflow as tf
import numpy as np
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import redirect
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer, TemplateHTMLRenderer

# create a function
def norm(data):

	if ((data / 20) * 100) < 60:
		dat = 0
	elif ((data / 20) * 100) <= 69 and ((data / 20) * 100) >= 60:
		dat = 1
	elif ((data / 20) * 100) <= 79 and ((data / 20)) * 100 >= 70:
		dat = 2
	elif ((data / 20) * 100) <= 89 and ((data / 20) * 100) >= 80:
		dat = 3
	elif ((data / 20) * 100) <= 100 and ((data / 20) * 100) >= 90:
		dat = 4

	return dat

def get_session(request):
	if request.method == 'POST':
		email = request.POST["email"]

		# try:
		data = History.objects.filter(owner=email).order_by("id").reverse()
		print('in')
		if data.exists():
			list_result = [[entry['datee'],entry['grade']]  for entry in data.values()]
			return JsonResponse({'data': list_result})
		else:
			print('ouch')
			return JsonResponse({'data': {}})
		# except:
		# 	print('not in')
		# 	return JsonResponse({'data': {}})
	else:
		return JsonResponse({'error': "404, not found"})


def pred(inp):
        # mdl = pickle.load(open('./model1000EWithMeduShuffleManyDenseLayers.h5', 'rb'))
		mdl= tf.keras.models.load_model('./model.h5')
		# inp = pd.Series(inp)
		# print(inp)
		inp =np.array(inp).reshape(1,1,7)
        # yhat = ((np.ravel(mdl.predict(inp)).tolist()))
		result = mdl.predict(inp)
		result = np.argmax(result[0], axis=None, out=None)
		return result


def geeks_view(request):
	context ={
		"data":"Gfg is the best",
		"list":[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	}
	return render(request, "index.html", context)


def dashboard(request):
	try:
		data = History.objects.filter(owner=request.session['email'])
		# print(data.values)

		if data.exists():
			# print("has data")
			return render(request, "dashboard.html", {'data': data})
		else:
			return render(request, "dashboard.html")

	except:
		response = redirect('/login')
		return response



def logout(request):
	del request.session['fname']
	del request.session['lname']
	del request.session['email']

	return JsonResponse({'result': True})
	


	
# @api_view(('GET', 'POST'))
# @renderer_classes((TemplateHTMLRenderer, JSONRenderer))
def predict(request):
	if request.method == 'GET':
		if 'email' in request.session:
			return render(request, "predict.html")
		else:
			response = redirect('/login')
			return response

	if request.method == 'POST':
		print('email' in request.session)
		if 'email' in request.session:
			dalc = int(request.POST["dalc"])
			walc = int(request.POST["walc"])
			fail = int(request.POST["fail"])
			abs = int(request.POST["abs"])
			g1 = norm(int(request.POST["g1"]))
			g2 = norm(int(request.POST["g2"]))
			medu = int(request.POST["medu"])
			email = request.POST["email"]

			param = [dalc, walc, abs, fail, medu, g1, g2]

			print(email)

			result = pred(param)

			history_data = {
				'Dalc' : dalc,
				'Walc' : walc,
				'absences' : abs,
				'failures' : fail,
				'Medu' : medu,
				'G1' : g1,
				'G2' : g2,
				'grade' : result,
				'owner' : email
			}
			
			posts_serializer = HistorySerializers(data=history_data)
			
			if posts_serializer.is_valid():
				posts_serializer.save()
				return JsonResponse({'result': True})
			else:
				print('error', posts_serializer.errors)
				return JsonResponse({'result': False})
		else:
			response = redirect('/login')
			return response


		# print(result)




def login(request):
	

	if request.method == 'POST':
		username = request.POST["username"]
		password = request.POST["password"]

		correct = PersonalInfo.objects.filter(email = username, password = password).exists()

		if correct:
			# print('here')
			qry = PersonalInfo.objects.get(email = username, password = password)
			data = PersonalInfoSerializers(qry).data
			
			# print(data)
			request.session['lname'] = data['lname']
			request.session['fname'] = data['fname']
			request.session['email'] = data['email']

			
			return JsonResponse({"status": True}, safe=True, status=200)
		
			# return redirect('/dashboard')

		else:
			return JsonResponse({"status": False}, safe=True, status=200)

	if request.method == 'GET':
		return render(request, "login.html")


def edit(request):
	if 'email' in request.session:
		if request.method == 'POST':
			old_username = request.session['email']

			username = request.POST["username"]
			password = request.POST["password"]

			all_hist = History.objects.filter(owner = old_username).exists()

			if all_hist:
				for i in History.objects.filter(owner = old_username):
					# print(i.owner)
					i.owner = username
					i.save()

			try:
				emp = PersonalInfo.objects.get(email = old_username)
				emp.email = username
				emp.password = password
				emp.save()

				request.session['email'] = username
				
				return JsonResponse({"status": True}, safe=True, status=200)
			except:
				return JsonResponse({"status": False}, safe=True, status=200)


		if request.method == 'GET':
			return render(request, "settings.html")

	else:
		response = redirect('/login')
		return response
