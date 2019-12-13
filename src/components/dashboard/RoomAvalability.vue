<template>
    <div class="card mg-b-10 mg-t-20 pd-t-35">
        <div class="table-responsive">
            <table class="table table-dashboard table-hotel-dash mg-b-0">
                <div class="scrollbar">
                        
                    <MonthDates :month="autoGenerateBookingsMetix" :year="autoGenerateYear" />
                        
                </div>
            </table>
        </div>
        <div class="card-footer bd-t-0">
            <ul class="color-codes">
                <li>
                    <i class="icon ion-md-square" style="color: #2ECC71"></i> Vacant
                </li>
                <li>
                    <i class="icon ion-md-square" style="color: #e74c3c"></i> Stay Over
                </li>
                <li>
                    <i class="icon ion-md-square" style="color: #3498db"></i> Booked
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

import firebase from "firebase";
import MonthDates from "./MonthDates.vue";

export default {
    name: "RoomAvalability",
    data() {
        return {
            roomStatus: [],
            bookings: [],
            monthSelected: (new Date()).getMonth(),
            yearSelected: (new Date()).getFullYear(),
            //   datesAndBookings:[]
            roomStatMetrix:[]
        };
    },
    computed: {
        datesAndBookings: function() {
            let bkng = this.bookings;
            let datesArr = []
            const year = (new Date()).getFullYear()
            for (let i = 1; i < getDaysInMonth(this.monthSelected, year); i++) {
                // for( let j = 0; j < bkng.length; j++ ){
                //     let chkinDate = 
                // }
                datesArr.push({ date: new Date(year, this.monthSelected, i), status: "available" })
            }
            for (let i = 1; i < datesArr.length; i++) {
                for (let j = 0; j < bkng.length; j++) {
                    let ckinDate = new Date(bkng.checkinDate)
                    let ckoutDate = new Date(bkng.checkoutDate)

                    // if(datesArr[i].date > )
                }

            }

        },
        autoGenerateMonth(){
            return this.$store.state.selectedMonth;
        },
        autoGenerateYear(){
            return this.$store.state.selectedYear;
        },


    },
    methods: {
        getDaysInMonth: function(month, year) {
            return new Date(year, month, 0).getDate();
        },
        getBookingForRoom(roomNum, typeId) {


            let filteredBookings = []

            this.bookings.forEach((item) => {

              // // console.log("------------"+item.roomTypeId+"------------")

                if (item.roomTypeId == typeId) {

                  // // console.log("room type found")

                    item.rooms.forEach(item2 => {

                        if (item2.id == roomNum) {
                            filteredBookings.push(item)
                        }

                    })

                }


            })

            return filteredBookings;

        },

    },
    async created() {

        let uid = firebase.auth().currentUser.uid;

        await firebase
            .firestore()
            .collection("Rooms")
            .where("hotelId", "==", uid)
            .get()
            .then(snapshot => {

                snapshot.forEach(item => {
                    // // console.log("room: ", item);
                    this.roomStatus.push({ ...item.data(), id: item.id });
                });

            });

        await firebase
            .firestore()
            .collection("Booking")
            .where("hotelId", "==", uid)
            .get()
            .then(snapshot => {
                
                snapshot.forEach(item => {
                    
                    this.bookings.push({ ...item.data(), id: item.id });
                });

                let rooms = this.roomStatus;
                let bookings = this.bookings;

                // // console.log(rooms)
                // // console.log(bookings)

                let roomBookingMetrix = []

                // // console.log(this.yearSelected)
                // // console.log(this.monthSelected)

                let numDates = new Date(this.yearSelected,this.monthSelected,0).getDate();

                rooms.forEach( ( room, roomIndex ) => {

                    let allRooms = room.available;

                    bookings.forEach( (booking) => {

                        if( booking.rooms != undefined ){

                            let rooms = booking.rooms;
                            let roomType = booking.roomTypeId;

                            rooms.forEach( bookedRoom => {

                                allRooms.forEach( allAvlRms => {

                                    for(let i=0;i<numDates;i++){

                                        let roomDate =  new Date(this.yearSelected,this.monthSelected,i);

                                        let checkinDateWthTime = new Date(booking.checkinDate.seconds * 1000)
                                        // let yrChkn = checkinDateWthTime.getFullYear();
                                        // let monthChkn = checkinDateWthTime.getMonth();
                                        // let dayChkn = checkinDateWthTime.getDay();

                                        let chknDate = new Date(checkinDateWthTime.toDateString())
                                        // let chknDate = new Date(yrChkn,monthChkn,dayChkn)
                                        // // console.log("-----chknDate: ",chknDate)

                                        let checkoutDateWthTime = new Date(booking.checkoutDate.seconds * 1000)
                                        // let yrChkt = checkoutDateWthTime.getFullYear();
                                        // let monthChkt = checkoutDateWthTime.getMonth();
                                        // let dayChkt = checkoutDateWthTime.getDay();
                                        let chktDate = new Date(checkoutDateWthTime.toDateString())
                                        // let chktDate = new Date(yrChkt,monthChkt,dayChkt)
                                        // // console.log("-----chktDate: ",chktDate)

                                        if( roomDate.getTime() >= chknDate.getTime() &&  roomDate.getTime() <= chktDate.getTime()){

                                            if( bookedRoom.id == allAvlRms && booking.roomTypeId == room.roomTypeId){
                                                // // console.log("chknDate: ",chknDate)
                                                // // console.log("roomDate: ",roomDate)
                                                roomBookingMetrix.push({
                                                    roomType:room.roomTypeId,
                                                    roomName:room.roomName,
                                                    roomNum:bookedRoom.id,
                                                    date:roomDate,
                                                    status:"booked"
                                                })
                                            }

                                        }

                                    }

                                })
                            })
                            

                        }
                        
                    });

                   

                });

                // console.log("roomBookingMetrix: ",roomBookingMetrix)
                this.roomStatMetrix = roomBookingMetrix;
                
            });
    },
    components: {
        MonthDates
    }
};
</script>

<style>
.scrollbar
{
    margin: 30px;
    float: left;
    height: 300px;
    width:95%;
    overflow-y: scroll;
}
</style>