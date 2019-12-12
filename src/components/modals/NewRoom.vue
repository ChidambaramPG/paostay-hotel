<template>
    <transition v-if="showModal" name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    <i data-feather="layers" class="tx-primary tx-12"></i> New Room
                                </h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <form action>
                                    <div class="form-group mg-b-10">
                                        <label for>Room Name</label>
                                        <input v-model="roomName" type="text" class="form-control" placeholder="Deluxe Suite" />
                                    </div>
                                    <div class="form-group mg-b-10">
                                        <label for>Room Type</label>
                                        <select v-model="selectedRoomTypeIndex" name id class="form-control rooms">
                                            <option v-for="(type,index) in roomTypes" :value="index" :id="index">{{type.roomName}}</option>
                                        </select>
                                    </div>
                                    <div class="form-group mg-b-10">
                                        <label for>Total Unit</label>
                                        <input v-model="totalRooms" type="text" class="form-control" placeholder="12" />
                                    </div>
                                    <div class="form-group mg-b-10">
                                        <label for>Price</label>
                                        <input v-model="price" type="text" class="form-control" placeholder="900" />
                                    </div>
                                </form>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="hideModal">Cancel</button>
                                <button type="button" class="btn btn-primary" @click="addNewRoom">Add Room</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import firebase from "firebase";
import store from "../../store.js";

// import {b-modal} from "bootstrap-vue";
// import { BModal } from "bootstrap-vue";

export default {
    name: "NewRoom",
    data() {
        return {
            roomName: "",
            roomType: "",
            roomTypeId: "",
            totalRooms: 0,
            price: 0,
            roomTypes: [],
            selectedRoomTypeIndex: 0
        }
    },
    components: {
        // BModal
    },
    computed: {
        showModal() {
            console.log("room component: ", this.$store.state.showNewRoomsModal);
            return this.$store.state.showNewRoomsModal;
        }
    },
    methods: {
        hideModal() {
            store.commit("setNewRoomsModalStatus", false);
        },
        addNewRoom() {

          console.log(this.roomName,this.selectedRoomTypeIndex,this.totalRooms,this.price)

          if (this.roomName != "" && this.totalRooms != 0 && this.price != 0) {

              let dbRef = firebase.firestore().collection("Rooms");
              let roomNumbers = [];

              let roomName = this.roomTypes[this.selectedRoomTypeIndex].roomName;
              let roomId  = this.roomTypes[this.selectedRoomTypeIndex].id;

              for (let i = 1; i <= this.totalRooms; i++) {
                  roomNumbers.push(i)
              }

              dbRef.add({
                  hotelId: firebase.auth().currentUser.uid,
                  roomName: this.roomName,
                  roomTypeId: roomId,
                  roomTypeName: roomName,
                  totalRooms: this.totalRooms,
                  price: this.price,
                  available: roomNumbers,
                  occupied: [],
                  status: "active"
              }).then(function(res) {
                  console.log(res)
                  store.commit("setNewRoomsModalStatus", false);
              });

          } else {
              alert("error in data entered");
          }
        }
    },
    created() {
        let dbRef = firebase.firestore().collection("RoomTypes");
        dbRef.get().then((response) => {
            let types = []
            response.forEach((item) => {
                console.log(item.data())
                types.push({ ...item.data(), id: item.id })
            })
            this.roomTypes = types;
        })
    }

};
</script>
<style>
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 500px;
    margin: 0px auto;
    /* padding: 20px 30px; */
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}
</style>