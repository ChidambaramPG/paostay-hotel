<template>
    <div>
        <div v-for="(rooms,index1) in roomsMetrix" :key="index1">
            <tr v-for="(days,index2) in rooms" :key="index2" v-if="index2 != 0">
                <td class="room-name">{{index1}} #{{index2}}</td>
                <td v-for="(a,i) in days" v-if="i !=0" :key="i">
                    <button href="#" class="btn btn-success rooms-btn" data-toggle="modal" data-target="#reservation" v-if="a[0].status !=undefined && a[0].status == 'available'">{{a[0].date}}</button>
                    <button href="#" class="btn btn-primary rooms-btn" data-toggle="modal" data-target="#reservation" v-if="a[0].status !=undefined && a[0].status == 'booked'" :id="a[0].bkIndex" @click="(event)=>changeBookingStatusMethod(event)">{{a[0].date}}</button>
                    <button href="#" :class="'btn btn-warning rooms-btn ' + a[0].status" data-toggle="modal" data-target="#reservation" v-if="a[0].status !=undefined && a[0].status == 'stayedover'" :id="a[0].bkIndex" @click="(event)=>changeBookingStatusMethod(event)">{{a[0].date}}</button>
                </td>
            </tr>
        </div>
        <ChangeBookingStatus />
    </div>
</template>
<script>
import firebase from "firebase";
import store from "../../store.js"
import ChangeBookingStatus from "../modals/ChangeBookingStatus.vue"


export default {
    name: "MonthDates",
    data() {
        return {
            roomStatus: [],
            selectedDate: new Date(),
            bookings: [],
            selectedMonth: "",
            selectedYear: "",
            roomTypes: [],
            isStatUpdated: false,
            newRoomStat: [],
            roomStatMetrix: [],
            computedRoomsMetrix: []
        };
    },
    components: {
        ChangeBookingStatus
    },

    async created() {

        this.selectedMonth = store.state.selectedMonth;
        this.selectedYear = store.state.selectedYear;

        // console.log("created")

        let uid = firebase.auth().currentUser.uid;

        await firebase
            .firestore()
            .collection("Rooms")
            .where("hotelId", "==", uid)
            .get()
            .then(snapshot => {

                snapshot.forEach(item => {
                    this.roomTypes.push({ ...item.data(), id: item.id });
                });

                // console.log("rooms obtained")

            });

        await firebase
            .firestore()
            .collection("Booking")
            .where("hotelId", "==", uid)
            .onSnapshot(snapshot => {

                // console.log("bookings obtained")

                snapshot.forEach(item => {

                    if (item.data().status == "stayedover" || item.data().status == "accepted") {
                        this.bookings.push({ ...item.data(), id: item.id });
                    }

                });

                let rooms = this.roomTypes;
                let bookings = this.bookings;

                let roomBookingMetrix = []

                let numDates = new Date(this.setYearDynamic, this.setMonthDynamic, 0).getDate();

                rooms.forEach((room, roomIndex) => {

                    let allRooms = room.available;



                    bookings.forEach((booking, bkIndex) => {

                        if (booking.rooms != undefined) {

                            let rooms = booking.rooms;
                            let roomType = booking.roomTypeId;

                            // // console.log("=======================> " + new Date(booking.bookedDate.seconds * 1000))

                            rooms.forEach(bookedRoom => {

                                allRooms.forEach(allAvlRms => {

                                    // // console.log("room: ",allAvlRms)

                                    for (let i = 1; i <= numDates; i++) {

                                        let roomDate = new Date(this.setYearDynamic, this.setMonthDynamic, i);

                                        let checkinDateWthTime = new Date(booking.checkinDate.seconds * 1000)

                                        let chknDate = new Date(checkinDateWthTime.toDateString())

                                        let checkoutDateWthTime = new Date(booking.checkoutDate.seconds * 1000)

                                        let chktDate = new Date(checkoutDateWthTime.toDateString())


                                        if(allAvlRms == 6){
                                            // // console.log(chknDate,chktDate,roomDate)
                                        }
                                        



                                        if ( chknDate.getTime() <= roomDate.getTime() && chktDate.getTime() >= roomDate.getTime() ) {

                                            // // console.log(roomDate,chknDate,chktDate)

                                            if (bookedRoom.id == allAvlRms && booking.roomTypeId == room.roomTypeId) {

                                                if (booking.status == "stayedover") {

                                                    roomBookingMetrix.push({
                                                        roomType: room.roomTypeId,
                                                        roomName: room.roomName,
                                                        roomNum: bookedRoom.id,
                                                        date: roomDate,
                                                        status: "stayedover",
                                                        bookingIndex: bkIndex
                                                    })

                                                } else {

                                                    roomBookingMetrix.push({
                                                        roomType: room.roomTypeId,
                                                        roomName: room.roomName,
                                                        roomNum: bookedRoom.id,
                                                        date: roomDate,
                                                        status: "booked",
                                                        bookingIndex: bkIndex
                                                    })

                                                }

                                            }

                                        }

                                    }

                                })
                            })


                        }

                    });



                });

                this.roomStatMetrix = roomBookingMetrix;

                let roomStatProp = roomBookingMetrix;

                this.roomStatus = []

                let totDays = new Date(this.setYearDynamic, this.setMonthDynamic, 0).getDate();
                let tempDateArr = new Array();

                let roomTypes1 = this.roomTypes;

                roomTypes1.forEach(type => {

                    if (!tempDateArr[type.roomName]) {
                        // console.log("creatng new index for", type.roomName)
                        tempDateArr[type.roomName] = []
                    }

                    type.available.forEach(rm => {

                        if (!tempDateArr[type.roomName][rm]) {
                            tempDateArr[type.roomName][rm] = []
                        }

                        for (let i = 0; i <= totDays; i++) {

                            if (!tempDateArr[type.roomName][rm][i]) {
                                tempDateArr[type.roomName][rm][i] = []
                            }

                            let roomDate = new Date(this.setYearDynamic, this.setMonthDynamic, i)

                            tempDateArr[type.roomName][rm][i].push({
                                date: i,
                                status: "available",
                                room: rm,
                                type: type.roomName,
                                roomType: type.roomTypeId
                            })

                            roomStatProp.forEach(item => {

                                let tmpDate = new Date(item.date);


                                if (tmpDate.getTime() == roomDate.getTime() && type.roomTypeId == item.roomType && item.roomNum == rm) {

                                    // console.log("statue : ", item.status)
                                    tempDateArr[type.roomName][rm][i][0].status = item.status;
                                    tempDateArr[type.roomName][rm][i][0].bkIndex = item.bookingIndex;

                                }

                            })

                        }

                    })

                })

                this.computedRoomsMetrix = { ...tempDateArr };
                store.commit("setComputedRoomsMetrix", this.computedRoomsMetrix);
            });

    },

    computed: {

        roomsMetrix() {
            return store.state.computedRoomsMetrix;
        },
        setMonthDynamic:function(){
            return this.$store.state.selectedMonth; 
        },
        setYearDynamic(){
            return this.$store.state.selectedYear;
        },
       
    },

    methods: {
        getDaysInMonth: function() {

            let month = this.month;
            let year = this.year;
            let days = new Date(year, month, 0).getDate();

            let mnthStrtDate = new Date(year, month, 0);
            let mnthEndDate = new Date(year, month, days);

            let datesAr = []
            if (this.bookings.length > 0) {

                // console.log("-------------Booking found------------")

                for (let i = 0; i < days; i++) {
                    for (let j = 0; j < this.bookings.length; j++) {
                        let chkn = new Date(this.bookings[j].checkinDate.seconds * 1000);
                        let chkt = new Date(this.bookings[j].checkoutDate.seconds * 1000);
                        let curDay = new Date(year, month, i)
                        if (curDay > chkn && curDay < chkt) {
                            datesAr.push({ date: i, status: "booked" })
                        } else {
                            datesAr.push({ date: i, status: "vaccant" })
                        }
                    }

                }
                // console.log(datesAr)

            } else {

                for (let i = 0; i < days; i++) {
                    datesAr.push({ date: i, status: "vaccant" })
                }

            }

            // return datesAr;

        },
        setRoomStats(roomStat) {

            // console.log("stats: ", this.isStatUpdated)

            this.roomStatus = []

            let totDays = new Date(this.setYearDynamic, this.setMonthDynamic, 0).getDate();
            let tempDateArr = new Array();

            let roomTypes1 = this.roomTypes;

            roomTypes1.forEach(type => {

                if (!tempDateArr[type.roomTypeId]) {
                    // console.log("creatng new index for", type.roomTypeId)
                    tempDateArr[type.roomTypeId] = []
                }

                type.available.forEach(rm => {

                    if (!tempDateArr[type.roomTypeId][rm]) {
                        tempDateArr[type.roomTypeId][rm] = []
                    }

                    for (let i = 1; i <= totDays; i++) {

                        if (!tempDateArr[type.roomTypeId][rm][i]) {
                            tempDateArr[type.roomTypeId][rm][i] = []
                        }

                        let roomDate = new Date(this.setYearDynamic, this.setMonthDynamic, i)


                        roomStat.forEach(item => {

                            let tmpDate = new Date(item.date);

                            if (tmpDate == roomDate) {
                                // console.log("date: ", i)
                                tempDateArr[type.roomTypeId][rm][i].push({
                                    date: i,
                                    status: "booked",
                                    room: rm,
                                    type: type.roomName
                                })

                            } else {

                                tempDateArr[type.roomTypeId][rm][i].push({
                                    date: i,
                                    status: "available",
                                    room: rm,
                                    type: type.roomName
                                })

                            }

                        })

                    }

                })

            })

            // console.log("tempDateArr: ", tempDateArr)
            this.isStatUpdated = true;


        },
        setMonthAndYear(month, year) {
            this.selectedMonth = month;
            this.selectedYear = year;
        },
        changeBookingStatusMethod(event) {

            // console.log(event)
            let bkngs = this.bookings;
            // console.log(bkngs[event.target.id])
            store.commit("setSelectedBooking", bkngs[event.target.id])
            store.commit("setChangeBookingStatusModalStatus", true)

        },
        changeMetrixOnMonthChange(){
            // console.log("chnging again")
            let uid = firebase.auth().currentUser.uid;

            firebase
                .firestore()
                .collection("Rooms")
                .where("hotelId", "==", uid)
                .get()
                .then(snapshot => {

                    snapshot.forEach(item => {
                        this.roomTypes.push({ ...item.data(), id: item.id });
                    });

                    // console.log("rooms obtained")
                    firebase
                .firestore()
                .collection("Booking")
                .where("hotelId", "==", uid)
                .onSnapshot(snapshot => {

                    // console.log("bookings obtained")

                    snapshot.forEach(item => {

                        if (item.data().status == "stayedover" || item.data().status == "accepted") {
                            this.bookings.push({ ...item.data(), id: item.id });
                        }

                    });

                    let rooms = this.roomTypes;
                    let bookings = this.bookings;

                    let roomBookingMetrix = []

                    let numDates = new Date(this.setYearDynamic, this.setMonthDynamic, 0).getDate();

                    rooms.forEach((room, roomIndex) => {

                        let allRooms = room.available;



                        bookings.forEach((booking, bkIndex) => {

                            if (booking.rooms != undefined) {

                                let rooms = booking.rooms;
                                let roomType = booking.roomTypeId;

                                // console.log("=======================> " + new Date(booking.bookedDate.seconds * 1000))

                                rooms.forEach(bookedRoom => {

                                    allRooms.forEach(allAvlRms => {

                                        // console.log("room: ",allAvlRms)

                                        for (let i = 1; i <= numDates; i++) {

                                            let roomDate = new Date(this.setYearDynamic, this.setMonthDynamic, i);

                                            let checkinDateWthTime = new Date(booking.checkinDate.seconds * 1000)

                                            let chknDate = new Date(checkinDateWthTime.toDateString())

                                            let checkoutDateWthTime = new Date(booking.checkoutDate.seconds * 1000)

                                            let chktDate = new Date(checkoutDateWthTime.toDateString())


                                            if(allAvlRms == 6){
                                                // console.log(chknDate,chktDate,roomDate)
                                            }
                                            



                                            if ( chknDate.getTime() <= roomDate.getTime() && chktDate.getTime() >= roomDate.getTime() ) {

                                                // // console.log(roomDate,chknDate,chktDate)

                                                if (bookedRoom.id == allAvlRms && booking.roomTypeId == room.roomTypeId) {

                                                    if (booking.status == "stayedover") {

                                                        roomBookingMetrix.push({
                                                            roomType: room.roomTypeId,
                                                            roomName: room.roomName,
                                                            roomNum: bookedRoom.id,
                                                            date: roomDate,
                                                            status: "stayedover",
                                                            bookingIndex: bkIndex
                                                        })

                                                    } else {

                                                        roomBookingMetrix.push({
                                                            roomType: room.roomTypeId,
                                                            roomName: room.roomName,
                                                            roomNum: bookedRoom.id,
                                                            date: roomDate,
                                                            status: "booked",
                                                            bookingIndex: bkIndex
                                                        })

                                                    }

                                                }

                                            }

                                        }

                                    })
                                })


                            }

                        });



                    });

                    this.roomStatMetrix = roomBookingMetrix;

                    let roomStatProp = roomBookingMetrix;

                    this.roomStatus = []

                    let totDays = new Date(this.setYearDynamic, this.setMonthDynamic, 0).getDate();
                    let tempDateArr = new Array();

                    let roomTypes1 = this.roomTypes;

                    roomTypes1.forEach(type => {

                        if (!tempDateArr[type.roomName]) {
                            // console.log("creatng new index for", type.roomName)
                            tempDateArr[type.roomName] = []
                        }

                        type.available.forEach(rm => {

                            if (!tempDateArr[type.roomName][rm]) {
                                tempDateArr[type.roomName][rm] = []
                            }

                            for (let i = 0; i <= totDays; i++) {

                                if (!tempDateArr[type.roomName][rm][i]) {
                                    tempDateArr[type.roomName][rm][i] = []
                                }

                                let roomDate = new Date(this.setYearDynamic, this.setMonthDynamic, i)

                                tempDateArr[type.roomName][rm][i].push({
                                    date: i,
                                    status: "available",
                                    room: rm,
                                    type: type.roomName,
                                    roomType: type.roomTypeId
                                })

                                roomStatProp.forEach(item => {

                                    let tmpDate = new Date(item.date);


                                    if (tmpDate.getTime() == roomDate.getTime() && type.roomTypeId == item.roomType && item.roomNum == rm) {

                                        // console.log("statue : ", item.status)
                                        tempDateArr[type.roomName][rm][i][0].status = item.status;
                                        tempDateArr[type.roomName][rm][i][0].bkIndex = item.bookingIndex;

                                    }

                                })

                            }

                        })

                    })

                    this.computedRoomsMetrix = { ...tempDateArr };
                    store.commit("setComputedRoomsMetrix", this.computedRoomsMetrix);
                });

                });

            
        }
    },
    props: [
        "month",
        "year",
        "roomStat"
    ],



};
</script>
<style>
.rooms-btn {
    padding: 5px;
}
</style>