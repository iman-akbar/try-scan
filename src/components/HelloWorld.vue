<template>
  <v-container>
<!--    <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>-->

    <!--    <date-picker v-model="time2" type="datetime"></date-picker>-->
    <v-select v-model="selectPage" :items="pages" @input="pageSelector"></v-select>
    <v-row v-if="selectPage === 'start proccess'" class="mt-5">
      <v-col>
        <div style="margin-bottom: 100px">
          <p>Start Proccess</p>
          <p>Only to be filled at the start of Equipment Repair/PM</p>
        </div>
        <div>
          <p>
            1. QR Code Decoded Data:
          </p>
        </div>
        <v-row class="mb-3">
          <!--          <v-col cols="auto">QR Code Decoded Data:</v-col>-->
          <v-col>
            <v-text-field
                label="QR Code Decoded Data"
                readonly
                outlined
                v-model="result"
                @input="masuk"
            ></v-text-field>
          </v-col>
        </v-row>
        <div>
          <p>2. Equipment type</p>
        </div>
        <v-row class="mb-3">
          <!-- <v-col cols="auto">User Id: </v-col> -->
          <v-col>
            <!-- <div>2. Equipment type</div> -->
            <v-select
                v-model="choosenEquipmentType"
                :items="equipmentType"
                label="Select your answer"
                dense
                outlined
                @input="selectingRoleType"
            ></v-select>
          </v-col>
        </v-row>
        <div>
          <p>3. Start Date:</p>
        </div>
        <v-row class="mb-3">
          <!--          <v-col cols="auto">Start Date:</v-col>-->
          <v-col>
            <!--            <v-datetime-picker-->
            <!--                v-model="datetime"-->
            <!--                :text-field-props="textFieldProps"-->
            <!--                :date-picker-props="dateProps"-->
            <!--                :time-picker-props="timeProps"-->
            <!--                time-format="HH:mm:ss"-->
            <!--            ></v-datetime-picker>-->
            <v-datetime-picker
                v-model="datetimeStart"
                :text-field-props="textFieldProps"
                :date-picker-props="dateProps"
                :time-picker-props="timeProps"
                time-format="HH:mm:ss"
                date-format="dd-MM-yyyy"
            >
              <template slot="dateIcon">
                <v-icon>fas fa-calendar</v-icon>
              </template>
              <template slot="timeIcon">
                <v-icon>fas fa-clock</v-icon>
              </template>
            </v-datetime-picker>
            <!--            <v-menu-->
            <!--                v-model="menu"-->
            <!--                :close-on-content-click="false"-->
            <!--                :nudge-right="40"-->
            <!--                transition="scale-transition"-->
            <!--                offset-y-->
            <!--                min-width="auto"-->
            <!--            >-->
            <!--              <template v-slot:activator="{ on, attrs }">-->
            <!--                <v-text-field-->
            <!--                    v-model="startDate"-->
            <!--                    label="Please input start date"-->
            <!--                    outlined-->
            <!--                    readonly-->
            <!--                    v-bind="attrs"-->
            <!--                    v-on="on"-->
            <!--                ></v-text-field>-->
            <!--              </template>-->
            <!--              <v-date-picker-->
            <!--                  v-model="date"-->
            <!--                  @input="menu = false"-->
            <!--              ></v-date-picker>-->
            <!--            </v-menu>-->
          </v-col>
        </v-row>
        <div><p>
          4. Start shift
        </p></div>
        <v-row class="mb-3">
          <!-- <v-col cols="auto">User Id: </v-col> -->
          <v-col>
            <!-- <div>2. Equipment type</div> -->
            <v-select
                v-model="choosenStartShift"
                :items="startShift"
                label="Select your answer"
                dense
                outlined

            ></v-select>
          </v-col>
        </v-row>
        <div class="text-center">
          <v-btn color="success" elevation="2" @click="submit">SUBMIT</v-btn>
        </div>
      </v-col>
      <v-col v-if="result === ''">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
      </v-col>
    </v-row>

    <!--    page 2-->
    <v-row v-if="selectPage === 'end proccess'" class=" mt-5">

      <v-col>
        <div style="margin-bottom: 100px">
          <p>End Proccess</p>
          <p>Only to be filled at the end of Equipment Repair/PM</p>
        </div>
        <div>
          <p>5. Equipment no.(Scanned by QR code):</p>
        </div>
        <v-row class="mb-3">
          <!--          <v-col cols="auto">Equipment no.(Scanned by QR code):</v-col>-->
          <v-col>
            <v-text-field
                label="QR Code Decoded Data"
                readonly
                outlined
                v-model="result"
                @input="masuk"
            ></v-text-field>
          </v-col>
        </v-row>
        <div>
          <p>6. Equipment type</p>
        </div>
        <v-row class="mb-3">
          <!-- <v-col cols="auto">User Id: </v-col> -->
          <v-col>
            <!-- <div>2. Equipment type</div> -->
            <v-select
                v-model="choosenEquipmentType"
                :items="equipmentType"
                label="Select your answer"
                dense
                outlined
                @input="selectingRoleType"
            ></v-select>
          </v-col>
        </v-row>
        <div>
          <p>7. Type of task to be performed -- Select from the option below</p>
        </div>
        <v-row class="mb-3">
          <v-radio-group v-model="taskType">
            <v-radio label="PM" value="PM">

            </v-radio>
            <v-radio label="Downtime-online repair" value="Downtime-online repair">

            </v-radio>
            <v-radio label="Downtime-offline repair" value="Downtime-offline repair">

            </v-radio>
          </v-radio-group>
        </v-row>
        <div><p>8.end Date:</p></div>
        <v-row class="mb-3">
          <!--          <v-col cols="auto">end Date:</v-col>-->
          <v-col>
            <v-datetime-picker
                v-model="datetimeEnd"
                :text-field-props="textFieldProps"
                :date-picker-props="dateProps"
                :time-picker-props="timeProps"
                time-format="HH:mm:ss"
                date-format="dd-MM-yyyy"
            >
              <template slot="dateIcon">
                <v-icon>fas fa-calendar</v-icon>
              </template>
              <template slot="timeIcon">
                <v-icon>fas fa-clock</v-icon>
              </template>
            </v-datetime-picker>

            <!--            <v-menu-->
            <!--                v-model="menu2"-->
            <!--                :close-on-content-click="false"-->
            <!--                :nudge-right="40"-->
            <!--                transition="scale-transition"-->
            <!--                offset-y-->
            <!--                min-width="auto"-->
            <!--            >-->
            <!--              <template v-slot:activator="{ on, attrs }">-->
            <!--                <v-text-field-->
            <!--                    v-model="endDate"-->
            <!--                    label="Please input end date"-->
            <!--                    outlined-->
            <!--                    readonly-->
            <!--                    v-bind="attrs"-->
            <!--                    v-on="on"-->
            <!--                ></v-text-field>-->
            <!--              </template>-->
            <!--              <v-date-picker-->
            <!--                  v-model="date"-->
            <!--                  @input="menu2 = false"-->
            <!--              ></v-date-picker>-->
            <!--            </v-menu>-->
          </v-col>
        </v-row>
        <div>
          <p>9. End shift:</p>
        </div>
        <v-row class="mb-3">

          <!-- <v-col cols="auto">User Id: </v-col> -->
          <v-col>
            <!-- <div>2. Equipment type</div> -->
            <v-select
                v-model="choosenEndShift"
                :items="endShift"
                label="Select your answer"
                dense
                outlined
                @input="selectingRoleType"
            ></v-select>
          </v-col>
        </v-row>
        <div><p>10. Equipment issue details</p></div>
        <v-row class="mb-3">
          <v-textarea
              v-model="equipmentIssue"
              outlined
              label="Enter your answer"
              auto-grow
          ></v-textarea>
        </v-row>
        <div><p>11. Action Taken</p></div>
        <v-row class="mb-3">

          <v-textarea
              v-model="actionTaken"
              name="input-7-1"
              outlined
              label="Enter your answer"
              auto-grow

          ></v-textarea>
        </v-row>
        <div class="text-center">
          <v-btn color="success" elevation="2" @click="submit">SUBMIT</v-btn>
        </div>
      </v-col>
      <v-col v-if="result === ''">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
        <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded"></StreamBarcodeReader>
      </v-col>
    </v-row>
    <v-dialog
        v-model="notification"
        transition="dialog-bottom-transition"
        max-width="600"
    >
      <v-card>
        <v-card-text>
          <v-card-text>
            <div class="text-h2">successs</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="closing">Close</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="FailedNotification"
        transition="dialog-bottom-transition"
        max-width="600"
    >
      <v-card>
        <v-card-text>
          <v-card-text>
            <div class="text-h2">Failed</div>
          </v-card-text>
          <v-card-actions class="justify-end">
            <v-btn text @click="closing">Close</v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
    <!-- <v-text-field readonly outlined></v-text-field>
    <div class="text-center">
      <v-btn color="success" elevation="2">SUBMIT</v-btn>
    </div> -->
  </v-container>
</template>

<script>
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";


// import DatePicker from 'vue2-datepicker';
// import 'vue2-datepicker/index.css';
import { StreamBarcodeReader } from "vue-barcode-reader";
import EasyCamera from 'easy-vue-camera';
export default {
  name: "HelloWorld",
  components: {StreamBarcodeReader},
  'v-easy-camera': EasyCamera,
// {WebCam}
  data: () => ({
    time2: null,
    choosenEndShift: "",
    choosenStartShift: "",
    choosenEquipmentType: "",
    date: "",
    menu: false,
    menu2: false,
    actionTaken: "",
    equipmentIssue: "",
    endShift: ["A", "B", "C"],
    datetimeEnd: new Date(),
    datetimeStart: new Date(),
    taskType: "",
    selectPage: "start proccess",
    pages: ["start proccess", "end proccess"],
    startShift: ["A", "B", "C"],
    datetime: new Date(),
    equipmentType: ["x", "y", "z"],
    result: "dsdsd",
    idNumber: "",
    notification: false,
    FailedNotification: false,
    // textFieldProps: {
    //   appendIcon: "event",
    // },
    // dateProps: {
    //   headerColor: "red",
    // },
    // timeProps: {
    //   useSeconds: true,
    //   ampmInTitle: true,
    // },
  }),
  methods: {
    submit2() {
      console.log(this.endDate)
    },
    pageSelector() {
      console.log(this.selectPage)
    },
    submit() {
      console.log(this.time2)
      if (this.result === "") {
        this.FailedNotification = true;
      } else {
        // let data = {
        //   actionType: "START_PROCESS",
        //   qrCodeDecodedData: this.result,
        //   equipmentType: this.choosenEquipmentType,
        //   startDate:this.startDate,
        //   startShift:this.choosenStartShift
        // };
        let data = ""
        if (this.selectPage === "start proccess") {
          data = {
            actionType: "START_PROCESS",
            qrCodeDecodedData: this.result,
            equipmentType: this.choosenEquipmentType,
            startDate: this.datetimeStart,
            startShift: this.choosenStartShift
          };
        } else {
          data = {
            actionType: "END_PROCESS",
            qrCodeDecodedData: this.result,
            equipmentType: this.choosenEquipmentType,
            endDate: this.datetimeEnd,
            endShift: this.choosenEndShift,
            typeOfTaskPerformed: this.taskType,
            equipIssueDetails: this.equipmentIssue,
            accessToken: this.actionTaken
          }
        }
        console.log(data);
        // let trial = {
        //   "sender": "first notif23",
        //   "messsage": "berhasil2"
        // }
        axios.get("http://universities.hipolabs.com/search?country=United+States", {})
        axios.get("https://api.openweathermap.org/data/2.5/weather?q=London&appid=3828deb1948f63abaed9ee91bba1b76d&unit=metric", {})
        // axios
        //     .post("http://18.141.232.181:8080/submit", trial, {})
        //     .then((response) => {
        //       console.log(response);
        //       this.notification = true;
        //     })
        //     .catch((error) => {
        //       console.log(error);
        //       this.FailedNotification = true;
        //     });

        axios
            .post("http://172.19.176.1:8090/api/add", data)
            .then((response) => {
              console.log(response);
              this.notification = true;
            })
            .catch((error) => {
              console.log(error);
              this.FailedNotification = true;
            });
      }
    },
    closing() {
      this.result = "";
      this.idNumber = "";
      this.notification = false;
      this.FailedNotification = false;
      this.choosenEndShift = "";
      this.choosenStartShift = "";
      this.choosenEquipmentType = "";
      this.date = "";
      this.actionTaken = "";
      this.equipmentIssue = "";
      this.taskType = "";
    },
    masuk() {
      console.log("masuk");
    },
    onDecode(result) {
      this.result = result;
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
  },
  computed: {
    endDate() {
      return this.formatDate(this.date);
    },
    startDate() {
      return this.formatDate(this.date);
    },
  },
};
</script>
