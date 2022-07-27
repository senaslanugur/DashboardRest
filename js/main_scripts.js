var config = {
    apiKey: "AIzaSyDAl-sAyQGr3tRpK5TwfPz5lVbfyvdD5TM",
    authDomain: "onurfirebase-8f143.firebaseapp.com",
    databaseURL: "https://onurfirebase-8f143.firebaseio.com",
    projectId: "onurfirebase-8f143",
    storageBucket: "onurfirebase-8f143.appspot.com",
    messagingSenderId: "611179792299",
    appId: "1:611179792299:web:dba6f8ab2cc03713c334ee"
};

firebase.initializeApp(config);
var database = firebase.database();
// var ref = firebase.database().ref().child('Wrapler');

// var data = [    
//     {
//     "name": "Kazandibi",
//     "details": "Kazandibi",
//     "price": 11.2
//     },
//     {
//     "name": "Sütlaç",
//     "details": "Sütlaç",
//     "price": 11.2
//     },
//     {
//     "name": "Puding",
//     "details": "Çikolata, Çilek, Muz",
//     "price": 11.2
//     }
// ]
// ref.set(data, function () {
//     console.log("data has been inserted");
// })
// ref.on("value", function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//     var childData = childSnapshot.val();
//     var id=childData.id;
//     console.log(childData);
//     });
// });
var ref = firebase.database().ref();

ref.on("value", function(snapshot) {
    var interface = document.getElementById("data_firebase")
    // console.log(snapshot.val());
    // console.log(snapshot.val().Makarnalar[0].price)
    var test = snapshot.val()
    // console.log(test)
    var keys = Object.keys(test);
    var datas =  Object.values(test) 
    // console.log(keys)
    // console.log(Object.values(test))

    //burası card.html ıcın
    // for(var i=0; i<keys.length; i++){
    //     var header =  '<div class="col-lg-6"> <div class="card shadow mb-4"> <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between"> '+
    //     '<h6 class="m-0 font-weight-bold text-primary">'+keys[i]+'</h6> <div class="dropdown no-arrow">Save and Other Options <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
    //     '<i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i> </a> <div class="dropdown-menu dropdown-menu-right shadow animated--fade-in"  aria-labelledby="dropdownMenuLink">'+
    //     '<div class="dropdown-header">Settings:</div> <a class="dropdown-item" href="#">Add New Menu</a> <a class="dropdown-item" href="#">Save Categories</a> <a class="dropdown-item" href="#">Delete Items</a> <a class="dropdown-item" href="#">Delete Categories</a> <a class="dropdown-item" href="#">Change Categories Name</a>'+
    //     '</div> </div> </div><div id="datas_menus"></div>' 

    //     var insider = ""
    //     for(var k=0; k<datas[i].length; k++){
    //         insider += '<div class="card-body">  <input class="form-control" type="text" value="'+datas[i][k].name+
    //         '" id="'+datas[i][k].name+'"><br><input class="form-control" type="text" value="'+datas[i][k].details+'" id="'+datas[i][k].details+'"><br><input class="form-control" type="number" value="'+
    //         datas[i][k].price+'" id="'+datas[i][k].price+'"></div><hr>'
    //     }
    //     interface.innerHTML += header + insider +'</div> </div>'
    // }
    //card html son

    var interface_2 = document.getElementById("datas_menu")
    for(var i=0; i<keys.length; i++){
        for(var k=0; k<datas[i].length; k++){
            interface_2.innerHTML += '<tr> <td>'+keys[i]+'</td><td>'+datas[i][k].name+'</td><td>'+datas[i][k].details+'</td><td>'+datas[i][k].price+'</td><td>'+
            '<i class="fas fa-edit" style="color:green;" id="'+keys[i] +'**'+ datas[i][k].name+'**'+datas[i][k].details+'**'+datas[i][k].price+'**'+i+'" onClick=update(this)></i>&nbsp;&nbsp;' +
            '<i class="fas fa-remove-format" style="color:red;"  id="'+keys[i] +'**'+ datas[i][k].name+'**'+datas[i][k].details+'**'+datas[i][k].price+'**'+i+'" onClick=remove(this)></i> </td></tr>'
        }
    }
}, function (error) {
    console.log("Error: " + error.code);
});
function update(d){
    var test = d.id
    // alert(test.split("**")[2])
    // alert(d.id)
    Swal.fire({
        title: test.split("**")[0]+ ', '+test.split("**")[1],
        html: '<input type="text" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Name" value="'+test.split("**")[1]+'"> <br>'+
            '<input type="text" class="form-control" id="details" aria-describedby="emailHelp" placeholder="Details" value="'+test.split("**")[2]+'"> <br>'+
            '<input type="number" class="form-control" id="price" aria-describedby="emailHelp" placeholder="Price" value="'+test.split("**")[3]+'">',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
        showCancelButton: true,
        confirmButtonText: 'Yes, Save it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          var name = document.getElementById("name").value
          var details = document.getElementById("details").value
          var price = document.getElementById("price").value
          Swal.fire(test.split("**")[0], '', 'info')
          var path = test.split("**")[0] + "/"
          var to_save = firebase.database().ref(path);
            var data = [    
                {
                "name": name,
                "details": details,
                "price": parseFloat(price)
                }
            ]
            to_save.update(data, function () {
                Swal.fire("Saved", '', 'info')
                location.reload();
            })
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info') 
        }
      })
}
function remove(d){
    var test = d.id
    Swal.fire({
        title: test.split("**")[0]+ ', '+test.split("**")[1],
        text: 'Are you sure for delete this menu from categories ?',
        imageUrl: 'https://unsplash.it/400/200',
        imageWidth: 400,
        imageHeight: 200,
        showCancelButton: true,
        confirmButtonText: 'Yes, Delete it!',
        cancelButtonText: 'No, cancel!'
      }).then((result) => {
        if (result.isConfirmed) {
            var path = test.split("**")[0] + "/" + test.split("**")[4]
            var to_remove = firebase.database().ref(path).remove();

        }


      })
}