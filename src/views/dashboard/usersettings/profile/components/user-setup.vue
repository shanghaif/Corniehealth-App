<template>
  <div class="container topest" style="height: 100vh; overflow-y: auto">
    <div class="w-full bg-white shadow-md p-5">
      <div class="">
        <div class="w-full border-b-2 curved flex">
          <h3 class="text-primary text-lg font-bold">Edit Profile</h3>
        </div>

        <div class="w-full">
          <div class="">
            <accordion-component title="Basic Info" :opened="true">
              <template v-slot:default>
                <div class="w-full py-4 px-4">
                  <span class="flex items-center mt-3 mb-3">
                    <cornie-avatar-field v-model="img.url" v-if="img.url" />
                    <cornie-avatar-field v-model="img.placeholder" v-else />
                  </span>
                  <div class="w-full flex flex-wrap items-center py-5">
                    <div class="-mb-2">
                      <cornie-radio
                        :checked="true"
                        :label="'General Practitioner'"
                        :value="true"
                        name="practiceRegister"
                      />
                    </div>
                    <div class="ml-4 -mb-2">
                      <cornie-radio
                        :label="'Specialist'"
                        :value="false"
                        name="practiceRegister"
                      />
                    </div>
                  </div>

                  <div class="grid grid-cols-3 gap-4">
                    <CornieInput
                      label="Identifier"
                      :modelValue="authPractitioner?.identifier"
                      placeholder="--Automatically Generated--"
                      :disabled="true"
                    />
                    <CornieSelect
                      label="Status"
                      :items="states"
                      :modelValue="authPractitioner?.activeState"
                      placeholder="Not editable"
                      :readonly="true"
                      :disabled="true"
                    />
                    <CornieInput
                      label="Type"
                      :modelValue="authPractitioner?.type"
                      placeholder="Not editable"
                      :disabled="true"
                    />

                    <CornieInput
                      label="name (first and last)"
                      v-model="name"
                      placeholder="--Enter--"
                      :required="true"
                    />

                    <CornieSelect
                      label="Gender"
                      :items="genders"
                      v-model="gender"
                      :required="true"
                      placeholder="--Enter--"
                    />
                    <phone-select
                      label="Phone number"
                      v-model="phone"
                      v-model:code="dialCode"
                      :required="true"
                      placeholder="--Enter--"
                    />
                    <cornie-input
                      :label="'Email'"
                      placeholder="--Enter--"
                      :rules="emailRule"
                      class="mb-5"
                      :required="true"
                      v-model="email"
                    />

                    <CornieInput
                      label="Address"
                      v-model="address"
                      placeholder="--Enter--"
                      :required="true"
                    />

                    <DatePicker
                      v-model="dateOfBirth"
                      label="Date of birth"
                      :rules="dobValidator"
                      :required="true"
                      style="width:max-width:100%"
                      placeholder="--Enter--"
                    />

                    <CornieInput
                      label="Job Designation"
                      :modelValue="authPractitioner?.jobDesignation"
                      placeholder="Not editable"
                      :disabled="true"
                    />

                    <CornieInput
                      label="Department"
                      :modelValue="authPractitioner?.department"
                      placeholder="Not editable"
                      :disabled="true"
                    />
                  </div>
                  <div class="w-full">
                    <span class="font-bold text-sm mb-5"
                      >Location(s) & privileges</span
                    >
                    <div class="grid grid-cols-4 gap-4">
                      <div
                        v-for="(
                          access, index
                        ) in authPractitioner?.locationRoles"
                        :key="index"
                        class="flex space-x-4 mt-5 border-r-2 border-gray-100 pr-5"
                      >
                        <div
                          class="w-10 h-10 rounded-full flex justify-center items-center bg-blue-600 text-white text-lg text-center font-bold mr-2"
                        >
                          {{
                            `${access?.location?.name
                              .substr(0, 1)
                              .toUpperCase()}${getRoleName(access.roleId)
                              .substr(0, 1)
                              .toUpperCase()}`
                          }}
                        </div>
                        <div>
                          <div class="text-black text-sm">
                            {{ access.location.name }}
                            <div
                              class="font-bolder text-black mr-1"
                              v-if="access.default"
                            >
                              •
                            </div>
                            <span class="text-blue-600 text-xs">
                              {{ access.default ? "Default" : "" }}</span
                            >
                          </div>
                          <p class="text-xs text-gray-400 mb-1">
                            {{ getRoleName(access.roleId) }}
                          </p>
                          <span
                            class="text-danger text-xs font-semibold cursor-pointer"
                            @click="
                              $router.push(
                                '/dashboard/provider/settings/roles-privileges'
                              )
                            "
                            >View privileges</span
                          >
                        </div>
                      </div>
                      <!-- <div class="flex space-x-4 mt-5">
                        <avatar :src="img.placeholder"/>
                        <div>
                          <p class="text-black text-sm">Market</p>
                          <p class="text-xs text-gray-300 mb-3">Physician</p>
                          <p class="text-danger text-xs font-semibold">View privileges</p>
                        </div>
                      </div> -->
                    </div>
                  </div>
                </div>
              </template>
              <template v-slot:misc>
                <info-icon class="fill-current text-primary" />
              </template>
            </accordion-component>

            <accordion-component title="Qualification" :opened="true">
              <template v-slot:default>
                <div class="w-full px-4 py-4">
                  <div class="grid grid-cols-3 gap-4">
                    <CornieInput
                      label="identifier"
                      :modelValue="authPractitioner?.identifier"
                      placeholder="--Automatically Generated--"
                      :disabled="true"
                    />
                    <CornieSelect
                      label="Code"
                      :items="dropdown.Qualification"
                      :modelValue="qualificationCode"
                      placeholder="--Select--"
                      :required="true"
                    />
                    <Period
                      label="Period"
                      v-model="period"
                      placeholder="--Select--"
                      class="w-full -mt-1"
                      :required="true"
                    />
                    <CornieInput
                      label="Issuer"
                      v-model="qualificationIssuer"
                      placeholder="--Enter--"
                      :required="true"
                    />
                    <cornie-select
                      :items="dropdown.CommunicationLanguage"
                      v-model="communicationLanguage"
                      label="Communication"
                      placeholder="--Select--"
                      :required="true"
                    />
                    <CornieInput
                      label="License Number"
                      v-model="licenseNumber"
                      placeholder="--Enter--"
                      :required="true"
                    />
                  </div>
                </div>
              </template>
              <template v-slot:misc>
                <info-icon class="fill-current text-primary" />
              </template>
            </accordion-component>

            <accordion-component
              title="Available Time"
              class="mt-4"
              :opened="true"
            >
              <div class="w-full py-4 px-4">
                <div class="w-full">
                  <operation-hours v-model="hoursOfOperation" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <CornieSelect
                    label="availability exceptions"
                    :items="['X-MAS', 'SALAH']"
                    v-model="availabilityExceptions"
                    placeholder="--Enter--"
                  />
                  <CornieSelect
                    label="consulation channel"
                    :items="dropdown.ConsultationChannel"
                    v-model="consultationChannel"
                    placeholder="--Enter--"
                  />
                </div>
              </div>
            </accordion-component>
          </div>
        </div>
      </div>
      <span class="flex w-full mb-5 mt-10 pb-10 justify-end">
        <cornie-btn
          @click="$router.back()"
          class="border-primary border-2 px-6 mr-3 rounded text-primary"
        >
          Cancel
        </cornie-btn>
        <cornie-btn
          :loading="loading"
          @click="submit"
          class="text-white bg-danger px-6 rounded"
        >
          Save
        </cornie-btn>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
  import Avatar from "@/components/avatar.vue";
  import CornieAvatarField from "@/components/cornie-avatar-field/CornieAvatarField.vue";
  import CornieBtn from "@/components/CornieBtn.vue";
  import CornieInput from "@/components/cornieinput.vue";
  import CornieRadio from "@/components/cornieradio.vue";
  import CornieSelect from "@/components/cornieselect.vue";
  import DatePicker from "@/components/datepicker.vue";
  import Period from "@/components/daterangepicker.vue";
  import AccordionComponent from "@/components/form-accordion.vue";
  import Button from "@/components/globals/corniebtn.vue";
  import InfoIcon from "@/components/icons/info.vue";
  import OperationHours from "@/components/new-operation-hours.vue";
  import PhoneSelect from "@/components/phone-input.vue";
  import { useHandleImage } from "@/composables/useHandleImage";
  import { cornieClient } from "@/plugins/http";
  import { createDate } from "@/plugins/utils";
  import IPractitioner, { HoursOfOperation } from "@/types/IPractitioner";
  import User from "@/types/user";
  import { Options, setup, Vue } from "vue-class-component";
  import { Watch } from "vue-property-decorator";
  import { namespace } from "vuex-class";
  import { date, string } from "yup";
  import setupHelper from "../helper/setup-helper";
  import EmptyState from "./empty-state.vue";

  const roles = namespace("roles");
  const dropdown = namespace("dropdown");
  const userStore = namespace("user");
  const userSettingsStore = namespace("usersettings");
  const practitioner = namespace("practitioner");

  @Options({
    components: {
      AccordionComponent,
      Button,
      DatePicker,
      Avatar,
      CornieInput,
      EmptyState,
      CornieSelect,
      PhoneSelect,
      Period,
      OperationHours,
      CornieBtn,
      InfoIcon,
      CornieAvatarField,
      CornieRadio,
    },
  })
  export default class USerSetup extends Vue {
    @roles.State
    roles!: any;

    @roles.Action
    getRoles!: () => Promise<any>;

    @userSettingsStore.State
    userprofiles!: any;

    @userSettingsStore.Action
    getUserProfile!: () => Promise<any>;

    @dropdown.Action
    getDropdowns!: (a: string) => Promise<IIndexableObject>;

    @userStore.State
    user!: User;

    @userStore.Getter
    authPractitioner!: IPractitioner;

    @userStore.Mutation
    updatePractitioner!: (payload: IPractitioner) => void;

    @userSettingsStore.Action
    setUserUp!: (body: IPractitioner) => Promise<boolean>;

    dropdown = {} as IIndexableObject;
    hoursOfOperation: HoursOfOperation[] = [];

    show = true;
    data: any = {};
    loading = false;

    types: string[] = ["Full Time (FT)", "Part Time (PT)", "AdHoc (AH)"];

    states: any[] = [
      { code: "active", display: "Active" },
      { code: "inactive", display: "Inctive" },
    ];

    genders: any[] = [
      { code: "male", display: "Male" },
      { code: "female", display: "Female" },
      { code: "other", display: "Other" },
    ];

    designations: any[] = [];
    levels: any[] = [];
    functions: any[] = [];

    times: any[] = [
      { day: "Monday", openTime: "", closeTime: "", selected: false },
      { day: "Tuesday", openTime: "", closeTime: "", selected: false },
      { day: "Wednesday", openTime: "", closeTime: "", selected: false },
      { day: "Thursday", openTime: "", closeTime: "", selected: false },
      { day: "Friday", openTime: "", closeTime: "", selected: false },
      { day: "Saturday", openTime: "", closeTime: "", selected: false },
      { day: "Sunday", openTime: "", closeTime: "", selected: false },
    ];

    img = setup(() => useHandleImage());
    //Email Valitdaiton
    emailRule = string().email("A valid email is required").required();

    //Date of birth validation
    dobValidator = date().max(
      createDate(0, 0, -16),
      "Director must be at least 16yrs."
    );
    userprofile = [];
    period = {} as Period;
    name = "";
    image = "";
    phone = "";
    dialCode = "+234";
    gender = "";
    address = "";
    firstName = "";
    lastName = "";
    dateOfBirth = "";
    qualificationIdentifier = "";
    qualificationIssuer = "";
    communicationLanguage = "";
    email = "";
    availabilityExceptions = "";
    consultationChannel = "";
    licenseNumber = "";
    qualificationCode = "" as any;

    @Watch("authPractitioner")
    updateData() {
      this.setData();
    }
    async setData() {
      if (!this.authPractitioner) return;
      const practitioner = setupHelper.constructPractitionerData(
        this.authPractitioner
      );
      if (!practitioner) return;
      this.name =
        this.authPractitioner?.firstName +
        " " +
        this.authPractitioner?.lastName;
      this.firstName = this.authPractitioner.firstName;
      this.lastName = this.authPractitioner.lastName;
      this.image = this.authPractitioner.image;
      this.img.url = this.authPractitioner.image;
      this.img.placeholder = this.authPractitioner.image;
      this.gender = this.authPractitioner.gender;
      this.address = this.authPractitioner.address;
      this.dateOfBirth = this.authPractitioner.dateOfBirth;
      this.qualificationIdentifier =
        this.authPractitioner.qualificationIdentifier;
      this.phone = this.authPractitioner.phone?.number;
      this.communicationLanguage = this.authPractitioner.communicationLanguage;
      this.email = this.authPractitioner.email;
      this.qualificationIssuer = this.authPractitioner.qualificationIssuer;
      this.availabilityExceptions =
        this.authPractitioner.availabilityExceptions;
      this.consultationChannel = this.authPractitioner.consultationChannel;
      this.licenseNumber = this.authPractitioner.licenseNumber;
      this.hoursOfOperation = this.authPractitioner.hoursOfOperation;
      this.qualificationCode = this.authPractitioner.qualificationCode;
      this.period = this.authPractitioner.period as any;
    }
    get payload() {
      return {
        image: this.image,
        gender: this.gender,
        address: this.address,
        firstName: this.firstName,
        lastName: this.firstName,
        dateOfBirth: this.dateOfBirth,
        qualificationIdentifier: this.qualificationIdentifier,
        phone: {
          number: this.phone,
          dialCode: this.dialCode,
        },
        communicationLanguage: this.communicationLanguage,
        email: this.email,
        qualificationIssuer: this.qualificationIssuer,
        availabilityExceptions: this.availabilityExceptions,
        consultationChannel: this.consultationChannel,
        licenseNumber: this.licenseNumber,
        hoursOfOperation: this.hoursOfOperation,
        period: this.period,
        qualificationCode: this.qualificationCode,
      };
    }
    async getP() {
      const { data } = await cornieClient().get(`/api/v1/user/practitioner`);
      console.log("dataPrac", data);
    }
    async setDropdown() {
      const data = await this.getDropdowns("practitioner");
      this.dropdown = data;
    }
    getRoleName(id: string) {
      const pt = this.roles.find((i: any) => i.id === id);
      return pt ? `${pt.name}` : "";
    }

    onAll(e: any) {
      if (e.target.checked) {
        this.times = this.times.map((i) => {
          i.selected = true;
          return i;
        });
      } else {
        this.times = this.times.map((i) => {
          i.selected = false;
          return i;
        });
      }
    }

    get allChecked() {
      const index = this.times.findIndex((i) => !i.selected);
      return index >= 0 ? false : true;
    }

    async getLevels() {
      try {
        const {
          data: { levels },
        } = await cornieClient().get(`/api/v1/orgHierarchy/levels`);
        this.levels = levels.map((i: any) => {
          return { code: i.id, display: i.name };
        });
      } catch (error) {}
    }
    async getDesignations() {
      try {
        const {
          data: { designations },
        } = await cornieClient().get(`/api/v1/orgHierarchy/designation`);
        this.designations = designations.map((i: any) => {
          return { code: i.id, display: i.name };
        });
      } catch (error) {}
    }
    async getDepartments() {
      try {
        const {
          data: { functions },
        } = await cornieClient().get(`/api/v1/orgHierarchy/function`);
        this.functions = functions.map((i: any) => {
          return { code: i.id, display: i.name };
        });
      } catch (error) {}
    }

    get accessRoles() {
      return this.roles.map((i: any) => {
        return { code: i.id, display: i.name };
      });
    }

    async submit() {
      this.loading = true;
      const body = {
        ...this.payload,
        firstName: this.name ? this.name.split(" ")[0] : "",
        lastName: this.name ? this.name.split(" ")[1] : "",
        dateOfBirth: this.payload.dateOfBirth
          ? new Date(this.payload.dateOfBirth).toISOString()
          : "",
        image: this.img.url || this.img.placeholder,
        activeState: this.authPractitioner.activeState,
        type: this.authPractitioner.type || "type",
        qualificationIdentifier: this.authPractitioner?.identifier,
        organizationId: this.authPractitioner.organizationId,
      };
      const url = `/api/v1/user/practitioner`;
      const payload = { ...body, id: this.authPractitioner.id };

      try {
        const response = await cornieClient().patch(url, payload);
        if (response.success) {
          console.log(response.data, "DATA");
          this.updatePractitioner(response.data);
          this.loading = false;
          window.notify({
            msg: "Practioner profile updated",
            status: "success",
          });
          this.$router.back();
        }
      } catch (error) {
        this.loading = false;
        window.notify({
          msg: "Practitioner profile not updated",
          status: "error",
        });
      }
    }

    async created() {
      this.setDropdown();
      await this.setData();
      if (this.roles) await this.getRoles();
      this.getDesignations();
      this.getLevels();
      this.getDepartments();
      await this.getP();
    }
  }
</script>

<style scoped>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .topest::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .topest {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
