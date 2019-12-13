
<template>
  <div class="col-lg-9 mg-t-5">
    <div class="card mg-b-10">
      <div class="table-responsive pd-25">
        <table class="table table-dashboard mg-b-0">
          <thead>
            <tr>
              <th>Room Image</th>
              <th>Room Name</th>
              <th>Room Type</th>
              <th>Total Units</th>
              <th>Price</th>
              <th>Status</th>
              <th>Action</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(room,index) in getRoomTypes" :key="index">
              <td>
                <img :key="ind2" v-for="(rmId,ind2) in roomImage" v-if="rmId['id'] == index" :src="rmId['image']" class="room-image" />
              </td>
              <td>{{room.roomName}}</td>
              <td>{{room.roomType}}</td>
              <td>{{room.totalRooms}}</td>
              <td>₹{{room.price}}</td>
              <td>
                <div class="custom-control custom-switch">
                  <input v-if="room.status == 'active'" type="checkbox" class="custom-control-input" 
                  :id="room.roomId" checked @change="setRoomStatus"/>
                  <input v-else type="checkbox" class="custom-control-input" 
                  :id="room.roomId" @change="setRoomStatus"/>
                  <label class="custom-control-label" :for="room.roomId">Active</label>
                </div>
              </td>
              <td>
                <a
                  href="#"
                  data-toggle="modal"
                  data-target="#new-room"
                  class="tx-rubik tx-medium tx-uppercase"
                >Edit</a> 
                
              </td>
              <td>
                <input type="file" @change="onFileChange" :id="index">                
              </td>
            </tr>
            
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import firebase, { firestore } from "firebase";
import store from "../../store.js";

export default {
  name: "Rooms",
  data(){

    return{
      roomImage:[]
    }
    
  },
  computed:{
    getRoomTypes(){
      // console.log("setting new rooms")
      // console.log(store.state.roomTypes)
      // console.log("----------")
      return store.state.roomTypes;
    }
  },
  methods:{
    setRoomStatus:function(event){
      // console.log(event)
      let dbRef = firebase.firestore().collection("Rooms");
      if(event.target.checked){
      
        dbRef.doc(event.target.id).update({
          status:'active'
        });
      }else{

        dbRef.doc(event.target.id).update({
          status:'inactive'
        });

      }
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      let rmId = e.target.id;
      // console.log(rmId)
      if (!files.length)
        return;
      this.createImage(files[0],rmId);
    },
    createImage(file,id) {
      var image = new Image();
      var reader = new FileReader();
      let imgUploadData = []

      reader.onload = (e) => {

        imgUploadData = {
          id:id,
          data:e.target.result,
          hotelId:firebase.auth().currentUser.uid,
          roomId:this.getRoomTypes[id]['roomId'],
          image:e.target.result
        }

        this.roomImage.push(imgUploadData)

      };

      reader.readAsDataURL(file);

      reader.onloadend = e => {

        let stRef = firebase.storage().ref();
        let frRef = firebase.firestore();

        let upldRef = stRef.child("RoomImages")
        .child(firebase.auth().currentUser.uid)
        .child(this.getRoomTypes[id]['roomId']+"_"+(new Date()).getTime()+".jpg");

        
        upldRef.put(file)
        .then( function(e) {

          // console.log("file upload completed")
          // console.log(e)

          if(e.state == "success"){

            // // console.log(upldRef.getDownloadURL())
            // upldRef.getDownloadURL().then( t=> {
            //   // console.log(t)
            // })

            upldRef.getDownloadURL().then( imgLnk => {

              imgUploadData["data"] = imgLnk;

              frRef.collection("RoomImages").add(imgUploadData).then( function(e) {
                // console.log(e);
                // console.log("data saved");
              })
              
            });

            // frRef.collection("RoomImages").doc(firebase.auth().currentUser.uid).collection(imgUploadData['roomId']).add(imgUploadData).then( function(e) {
            //   // console.log(e);
            //   // console.log("data saved");
            // })

            

          }
          

        })
      }

      // console.log(reader)
    },
  },
  created(){
      let user = firebase.auth().currentUser;
      let dbRef = firebase.firestore().collection("Rooms");
      let roomTypes = []
      dbRef.where("hotelId","==",user.uid).onSnapshot(function(snapshot){
          roomTypes = [];
          snapshot.forEach(item => {
              // console.log(item)
              roomTypes.push({...item.data(),"roomId":item.id})
          })
          store.commit("setRoomTypes",roomTypes);
      })
  }
};
</script>

<style>
  .room-image{
    width:20px;
    size: 20px;
  }
</style>