<template>
    <transition v-if="showModal" name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">
                                    <i data-feather="radio" class="tx-primary tx-12"></i>Select Rooms
                                </h5>
                                <ul class="color-codes">
                                    <li>
                                        <i class="icon ion-md-square" style="color: #2ECC71"></i> Vacant
                                    </li>
                                    <li>
                                        <i class="icon ion-md-square" style="color: #3498db"></i> Booked
                                    </li>
                                </ul>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="hideModal">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <div class="row">
                                    <div class="col-md-2 room-button" v-for="(room,index) in remainingRooms[0]" :key="index">
                                        <button @click="(event) => addRoomForBooking(event)" :id="room.id" :class="'btn btn-primary room-select-btn'" v-if=" room.status == 'selected' ">{{room.id}}</button>
                                        <button @click="(event) => addRoomForBooking(event)" :id="room.id" :class="'btn btn-success room-select-btn'" v-else>{{room.id}}</button>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="hideModal">Cancel</button>
                                <button type="button" class="btn btn-primary" @click="confimBookingWithRooms">Confirm Booking</button>
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
// import $ from "jQuery";

export default {
    name: "SelectRooms",
    data() {
        return {
            roomName: "",
            roomType: "",
            totalRooms: 0,
            price: 0,
            roomStatus: [],
            availableRooms: [],
            occupiedRooms: [],
            remainingRooms: [],
            selectedRooms: [],
            roomAddedCount: 0,
            selectedMonth: "",
            selectedYear: "",
        };
    },

    computed: {
        showModal() {
            // console.log("rooms modal: ", this.$store.state.showRoomSelectionModal);
            if (this.$store.state.showRoomSelectionModal) {

                let uid = firebase.auth().currentUser.uid;
                let bookingDet = store.state.selectedBooking;
                let roomType = bookingDet.roomTypeId;

                let checkinDate = bookingDet.checkinDate;
                let checkoutDate = bookingDet.checkoutDate;
                this.selectedMonth = store.state.selectedMonth;
                this.selectedYear = store.state.selectedYear;

                let computedRoomsMetrix = store.state.computedRoomsMetrix;
                let ocpdRms = [];
                let bkdRms = []

                firebase
                    .firestore()
                    .collection("Rooms")
                    .where("hotelId", "==", uid)
                    .where("roomTypeId", "==", roomType)
                    .get()
                    .then(snapshot => {
                        let a1 = [];
                        snapshot.forEach(item => {
                            a1.push({ ...item.data(), id: item.id });
                            console.log(item.data())

                            console.log("computedRoomsMetrix: ",computedRoomsMetrix)

                            Object.keys(computedRoomsMetrix).forEach((type, index0) => {

                              console.log(type)
                              let roomItem = computedRoomsMetrix[type]

                              console.log("roomItem",roomItem)

                                if (item.data().roomName == type) {

                                    Object.keys(roomItem).forEach( room => {

                                        console.log("--------------> room: ",room)

                                        let roomDates = roomItem[room]

                                        Object.keys(roomDates).forEach( (date1,index1) => {

                                          // console.log("date1: ", date1)

                                          if(date1 != 0){

                                            let loopDay = new Date(this.selectedYear,this.selectedMonth,date1);
                                            let cin = new Date(checkinDate.seconds * 1000)
                                            let cout = new Date(checkoutDate.seconds * 1000)

                                            let cinMdf = new Date(cin.getFullYear(),cin.getMonth(),cin.getDate())
                                            let coutMdf = new Date(cout.getFullYear(),cout.getMonth(),cout.getDate())


                                            // console.log(cinMdf.getTime() <= loopDay.getTime(),coutMdf.getTime() >= loopDay.getTime())

                                            if(cinMdf.getTime() <= loopDay.getTime() && coutMdf.getTime() >= loopDay.getTime()){

                                              console.log("room dates: ",roomDates[date1])


                                              if(roomDates[date1][0].status == "booked" || roomDates[date1][0].status == "stayedover" ){

                                                console.log(room," unavailable on : ",loopDay)
                                                bkdRms.push({id:room,status:"booked"})

                                              }else{

                                                ocpdRms.push({id:room,status:"available"})

                                              }

                                              

                                            }

                                          }
                                          

                                        })
                                    })

                                }


                            })

                            // console.log("ocpdRms:",ocpdRms)

                            let uniqueRmVal = ocpdRms.filter( orm => (!bkdRms.some( brm => (brm.id == orm.id))))
                            let remRooms = []

                            console.log("uniqueRmVal",uniqueRmVal)

                            remRooms = uniqueRmVal.filter((thing, index, self) =>
                              index === self.findIndex((t) => (
                                t.id === thing.id && t.status === thing.status
                              ))
                            )
                            // console.log("tstArr",tstArr)
                            
                            // const map = new Map();

                            // for (const itm1 of uniqueRmVal) {
                            //     if(!map.has(item.id)){
                            //         map.set(item.id, true);    
                            //         remRooms.push({
                            //             id: item.id,
                            //             status: item.status
                            //         });
                            //     }
                               
                            // }
                            console.log("remRooms",remRooms)
                            this.remainingRooms = []
                            this.remainingRooms.push({...remRooms})
                            

                        });
                        
                        console.log("fetch completed");
                    });
            }
            return this.$store.state.showRoomSelectionModal;
        }
    },

    methods: {
        hideModal() {
            this.selectedRooms = []
            store.commit("setRoomSelectionModalStatus", false);
        },

        addRoomForBooking(event) {
            // console.log(event.target);

            let roomId = event.target.id;
            this.selectedRoomId = roomId;
            // let roomSelected = this.selectedRooms;
            console.log("room id: ", roomId);
            // console.log(roomSelected);

            let remRm = this.remainingRooms[0];

            let newRem = [];
            console.log(remRm[0])

            Object.values(remRm).forEach(item => {
              console.log(item.id,roomId)
                if (item.id == roomId) {
                  console.log("room found")
                    if (item.status == "selected") {
                        this.roomAddedCount--;
                        item.status = "available";
                    } else {
                        if (this.roomAddedCount + 1 > store.state.selectedBooking.roomCount) {
                            alert("max rooms added");
                        } else {
                            this.roomAddedCount++;
                            item.status = "selected";
                        }
                    }
                }

                newRem.push({...item});
                // console.log({...item})
            });

            this.remainingRooms.push(newRem)
        },

        confimBookingWithRooms() {
            let maxRooms = store.state.selectedBooking.roomCount;
            let selRooms = [];


            Object.values(this.remainingRooms[0]).forEach(item => {
                
                if (item.status == "selected") {
                    console.log(item)
                    selRooms.push(item);
                }
            });

            let bookingId = store.state.selectedBooking.id;

            let bookingMetrix = store.state.computedRoomsMetrix;

            // console.log(bookingMetrix)




            firebase
              .firestore()
              .collection("Booking")
              .doc(bookingId)
              .update({
                rooms: selRooms,
                status:"accepted"
              }).then( () => {
                store.commit("setRoomSelectionModalStatus",false);
              });

        }
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

.room-button {
    margin: 10px;
}
</style>