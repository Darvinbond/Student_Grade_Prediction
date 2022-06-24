function innocent(){
    document.querySelector('.fname').classList.remove('border-red-500')
    document.querySelector('.lname').classList.remove('border-red-500')
    document.querySelector('.email').classList.remove('border-red-500')
    document.querySelector('.p1').classList.remove('border-red-500')
    document.querySelector('.p2').classList.remove('border-red-500')
}

function validateEmail(email){
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
}


function handleSubmit(){
    // alert("yeah");
    innocent();

    var err = 0
    if(document.querySelector('.fname').value == ""){
        document.querySelector('.fname').classList.add('border-red-500')
        err += 1
    }

    if(document.querySelector('.lname').value == ""){
        document.querySelector('.lname').classList.add('border-red-500')
        err += 1
    }

    if(document.querySelector('.email').value == ""){
        document.querySelector('.email').classList.add('border-red-500')
        err += 1
    }

    if(validateEmail(document.querySelector('.email').value)){
        // 
    }else{
        document.querySelector('.email').classList.add('border-red-500')
        err += 1
    }

    if(document.querySelector('.p1').value == ""){
        document.querySelector('.p1').classList.add('border-red-500')
        err += 1
    }

    if(document.querySelector('.p2').value == ""){
        document.querySelector('.p2').classList.add('border-red-500')
        err += 1
    }

    if(document.querySelector('.p1').value !== document.querySelector('.p2').value){
        document.querySelector('.p1').classList.add('border-red-500')
        document.querySelector('.p2').classList.add('border-red-500')
        err += 1
    }

    if(err == 0){
        let form_data = new FormData();
        form_data.append('fname', document.querySelector(".fname").value);
        form_data.append('lname', document.querySelector(".lname").value);
        form_data.append('email', document.querySelector(".email").value);
        form_data.append('password', document.querySelector(".p1").value);

        axios.post('/api/personalinfo/', form_data, {
            headers: {
                'Content-Type': "multipart/form-data;"
            }
        })
        .then(res =>{
            alert('success')
            alert(res.status)
        })
        .catch(err =>{
            console.log(err)
        })
    }else{

    }
}









function handleSubmit1(){
    document.querySelector('.email').classList.remove('border-red-500')
    document.querySelector('.p2').classList.remove('border-red-500')
    
    var err = 0

    if(document.querySelector('.email').value == ""){
        document.querySelector('.email').classList.add('border-red-500')
        err += 1
    }

    if(validateEmail(document.querySelector('.email').value)){
        // 
    }else{
        document.querySelector('.email').classList.add('border-red-500')
        err += 1
    }

    if(document.querySelector('.p2').value == ""){
        document.querySelector('.p2').classList.add('border-red-500')
        err += 1
    }

    if(err == 0){
        let form_data = new FormData();
        form_data.append('username', document.querySelector(".email").value);
        form_data.append('password', document.querySelector(".p2").value);

        axios.post('', form_data, {
            headers: {
                'Content-Type': "multipart/form-data;"
            }
        })
        .then(res =>{
            if(res.data.status == true){
                // alert('success')
                window.location.href = "/dashboard";
            }else{
                alert('wrong credentials')
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }else{

    }
}












function handleSubmit2(){
    document.querySelector('.spn').classList.remove('hidden')

    document.querySelector('.abs').classList.remove('border-red-500')
    document.querySelector('.g1').classList.remove('border-red-500')
    document.querySelector('.g2').classList.remove('border-red-500')
    document.querySelector('.fail').classList.remove('border-red-500')
    
    var err = 0 

    if(document.querySelector('.abs').value == ""){
        document.querySelector('.abs').classList.add('border-red-500')
        err += 1
    }

    if(document.querySelector('.fail').value == ""){
        document.querySelector('.fail').classList.add('border-red-500')
        err += 1
    }

    if(document.querySelector('.g1').value == ""){
        document.querySelector('.g1').classList.add('border-red-500')
        err += 1
    }


    if(document.querySelector('.g2').value == ""){
        document.querySelector('.g2').classList.add('border-red-500')
        err += 1
    }

    if(err == 0){
        let form_data = new FormData();
        form_data.append('dalc', document.querySelector(".dalc").value);
        form_data.append('walc', document.querySelector(".walc").value);
        form_data.append('g1', document.querySelector(".g1").value);
        form_data.append('g2', document.querySelector(".g2").value);
        form_data.append('medu', document.querySelector(".medu").value);
        form_data.append('email', document.querySelector(".email").value);

        // console.log(document.querySelector(".email").value)


        if(document.querySelector('.fail').value >= 0 && document.querySelector('.fail').value <= 3){
            form_data.append('fail', document.querySelector(".fail").value);
        }else{
            form_data.append('fail', 4);
        }

        if(document.querySelector('.abs').value >= 0 && document.querySelector('.abs').value <= 93){
            form_data.append('abs', document.querySelector(".abs").value);
        }else{
            form_data.append('fail', 93);
        }

        axios.post('', form_data, {
            headers: {
                'Content-Type': "multipart/form-data;"
            }
        })
        .then(res =>{
            document.querySelector('.spn').classList.add('hidden')
            if(res.data.result == true){
                alert('success')
            }else{
                alert('wrong credentials')
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }else{
        document.querySelector('.spn').classList.add('hidden')
        alert("fill in the required fields")
    }
}


function logout(){

    axios.post('/logout', {}, {
        headers: {
            'Content-Type': "multipart/form-data;"
        }
    })
    .then(res =>{
        console.log(res)
        if(res.data.result == true){
            window.location.href = "/login";
        }else{
            alert('error')
        }
    })
    .catch(err =>{
        console.log(err)
    })
}


function edit(){
    document.querySelector('.email').classList.remove('border-red-500')
    document.querySelector('.password').classList.remove('border-red-500')

    let form_data = new FormData();
    form_data.append('username', document.querySelector(".email").value);
    form_data.append('password', document.querySelector(".password").value);

    var err = 0
    if(document.querySelector('.email').value == ""){
        document.querySelector('.email').classList.add('border-red-500')
        err += 1
    }

    if(document.querySelector('.password').value == ""){
        document.querySelector('.password').classList.add('border-red-500')
        err += 1
    }

    if(validateEmail(document.querySelector('.email').value)){
        // 
    }else{
        document.querySelector('.email').classList.add('border-red-500')
        err += 1
    }

    if(err > 0){
        //
    }else{
        axios.post('/edit', form_data, {
            headers: {
                'Content-Type': "multipart/form-data;"
            }
        })
        .then(res =>{
            console.log(res)
            if(res.data.status == true){
                window.location.href = "/dashboard";
            }else{
                alert('error')
            }
        })
        .catch(err =>{
            console.log(err)
        })
    }
}