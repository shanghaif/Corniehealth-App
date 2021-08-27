<template>
<div class="bg-white shadow-md p-3 mt-2 mb-2 rounded w-full h-full">
  <div class="w-full">
    <div
      class="h-11 w-full flex items-center justify-between"
      :class="{
        'bg-white border-b-2': expand,
        'rounded-t-xl': first && expand,
      }"
    >
      <div class="font-bold text-base mb-1" :class="{ 'text-black': expand }">
        {{ title }}
      </div>
      <span class="flex items-center">
        <span
          class="mr-3 cursor-pointer"
          :class="{ 'fill-current text-white': expand }"
        >
          <slot name="misc" />
        </span>
        <chevron-down-icon
          class="cursor-pointer stroke-current"
          :class="{ 'text-primary': expand }"
          @click="expand = false"
          v-if="expand"
        />
        <chevron-right-icon
          class="cursor-pointer stroke-current"
          :class="{ 'text-primary': expand }"
          v-else
          @click="expand = true"
        />
      </span>
    </div>
    <div v-if="expand"><slot name="default" /></div>
  </div>
</div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import ChevronRightIcon from "@/components/icons/chevronright.vue";
import ChevronDownIcon from "./icons/chevrondownprimary.vue";

@Options({
  name: "AccordionItem",
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
  },
})
export default class AccordionComponent extends Vue {
  @Prop({ type: String, default: "" })
  title!: string;

  @Prop({ type: Boolean, default: false })
  first!: boolean;

  expand = true;

  @Prop({ type: Boolean, default: false })
  opened!: boolean;

  @Watch("opened")
  toggled() {
    this.expand = this.opened;
  }
  @Prop({ type: String, default: "" })
  titledescription!: string;
}
</script>