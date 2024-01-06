<template>
  <div
    class="flex w-full flex-col fixed h-full inset-0 m-auto z-[999999] bg-white overflow-hidden"
  >
    <!-- Navbar here -->
    <ReusableUIModalsFormBuilderTopNav
      :formItems="formItems"
      :showCode="showCode"
      :copyText="copyText"
      @handleCopy="handleCopy()"
      @formItems="
        () => {
          editBar.show = false;
          handleInitialForm(initialFormOption);
        }
      "
      @showCode="
        (val) => {
          editBar.show = false;
          showCode = val;
        }
      "
      @closeBuilder="$emit('closeBuilder')"
    />
    <div class="flex flex-row h-full">
      <div
        class="w-full flex flex-col relative bg-white overflow-auto custom-background dark:bg-neutral-900"
      >
        <!-- here is the zoom feature  -->
        <div
          v-if="showCode == 'playground'"
          class="flex items-center gap-4 z-[999999999999] px-3.5 py-1.5 bg-white dark:bg-neutral-700/70 rounded-lg absolute top-6 right-4"
        >
          <svg
            width="20"
            @click="() => ZoomIn()"
            class="cursor-pointer text-neutral-600 dark:text-neutral-200"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3741_30054)">
              <path
                d="M15.0252 13.8473L18.5943 17.4157L17.4152 18.5948L13.8469 15.0257C12.5191 16.09 10.8677 16.6689 9.16602 16.6665C5.02602 16.6665 1.66602 13.3065 1.66602 9.1665C1.66602 5.0265 5.02602 1.6665 9.16602 1.6665C13.306 1.6665 16.666 5.0265 16.666 9.1665C16.6684 10.8682 16.0895 12.5196 15.0252 13.8473ZM13.3535 13.229C14.4111 12.1414 15.0017 10.6835 14.9993 9.1665C14.9993 5.94317 12.3885 3.33317 9.16602 3.33317C5.94268 3.33317 3.33268 5.94317 3.33268 9.1665C3.33268 12.389 5.94268 14.9998 9.16602 14.9998C10.683 15.0022 12.1409 14.4116 13.2285 13.354L13.3535 13.229ZM8.33268 8.33317V5.83317H9.99935V8.33317H12.4993V9.99984H9.99935V12.4998H8.33268V9.99984H5.83268V8.33317H8.33268Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_3741_30054">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <div class="w-px bg-neutral-200 dark:bg-neutral-500 h-[26px]"></div>
          <svg
            width="20"
            @click="() => ZoomOut()"
            height="20"
            class="cursor-pointer text-neutral-600 dark:text-neutral-200"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_3741_30058)">
              <path
                d="M15.0252 13.8473L18.5943 17.4157L17.4152 18.5948L13.8469 15.0257C12.5191 16.09 10.8677 16.6689 9.16602 16.6665C5.02602 16.6665 1.66602 13.3065 1.66602 9.1665C1.66602 5.0265 5.02602 1.6665 9.16602 1.6665C13.306 1.6665 16.666 5.0265 16.666 9.1665C16.6684 10.8682 16.0895 12.5196 15.0252 13.8473ZM13.3535 13.229C14.4111 12.1414 15.0017 10.6835 14.9993 9.1665C14.9993 5.94317 12.3885 3.33317 9.16602 3.33317C5.94268 3.33317 3.33268 5.94317 3.33268 9.1665C3.33268 12.389 5.94268 14.9998 9.16602 14.9998C10.683 15.0022 12.1409 14.4116 13.2285 13.354L13.3535 13.229ZM5.83268 8.33317H12.4993V9.99984H5.83268V8.33317Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_3741_30058">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <!-- Here is the playground area  -->
        <div
          v-if="showCode == 'playground'"
          id="zoomableElement"
          style="transition: transform 0.2s"
          class="w-full max-h-[90%] h-[90%]"
        >
          <div
            :style="updatedFieldStyle"
            class="flex mx-auto relative overflow-auto content-scroll mb-6 my-7 rounded-lg border-2 border-neutral-200"
          >
            <form class="!w-full h-full flex flex-col whitespace-pre-line">
              <!-- Form canvas -->
              <ReusableUiModalsFormBuilderNestedComp
                :formItems="formItems"
                :formBody="formBody"
                :group="{ name: 'people' }"
                @showEditBar="showEditBar"
                @updateContainer="updateContainer"
              />
            </form>
          </div>
          <!-- Here is the empty State  -->
          <div
            v-if="formItems.length === 0"
            class="absolute inset-0 m-auto w-fit h-fit mt-[105px]"
          >
            <ReusableUIEmptyState
              label="Fields"
              label-light="You haven't added any fields yet"
              icon="/icons/no_data.svg"
            />
          </div>
        </div>
        <div
          class="h-full bg-white dark:bg-neutral-800 flex flex-col gap-8"
          :class="showCode !== 'viewcode' ? 'p-6' : ''"
          v-if="showCode == 'viewform' || showCode == 'viewcode'"
        >
          <!-- Preview screens Here -->
          <div
            class="flex p-1 gap-1 rounded-md border border-[#D0D5DD] dark:border-neutral-700 bg-white dark:bg-neutral-900 w-fit self-end"
            v-if="showCode == 'viewform'"
          >
            <div
              class="flex items-center p-2 rounded cursor-pointer"
              @click="
                handleWidth('desktop', '800px', '/icons/desktop_screen.png')
              "
              :class="currentView === 'desktop' ? 'bg-blue-600' : ''"
            >
              <!-- '600px', -->

              <svg
                width="24"
                :class="
                  currentView === 'desktop'
                    ? 'text-white'
                    : 'text-neutral-700 dark:text-neutral-500'
                "
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.75 17L9 20L8 21H16L15 20L14.25 17M3 13H21M5 17H19C20.1046 17 21 16.1046 21 15V5C21 3.89543 20.1046 3 19 3H5C3.89543 3 3 3.89543 3 5V15C3 16.1046 3.89543 17 5 17Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>

            <div
              class="flex items-center p-2 rounded cursor-pointer"
              @click="
                handleWidth(
                  'tablet',
                  '420px',
                  `/icons/${
                    colorMode.preference == 'dark'
                      ? 'tablet_screen-dark'
                      : 'tablet_screen'
                  }.png`
                )
              "
              :class="currentView === 'tablet' ? 'bg-blue-600' : ''"
            >
              <!-- '600px', -->

              <svg
                width="24"
                :class="
                  currentView === 'tablet'
                    ? 'text-white'
                    : 'text-neutral-700 dark:text-neutral-500'
                "
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 18H12.01M7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.89543 18.1046 3 17 3H7C5.89543 3 5 3.89543 5 5V19C5 20.1046 5.89543 21 7 21Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              class="flex items-center p-2 rounded cursor-pointer"
              @click="
                handleWidth(
                  'phone',
                  '280px',
                  `/icons/${
                    colorMode.preference == 'dark'
                      ? 'mobile_screen-dark'
                      : 'mobile_screen'
                  }.png`
                )
              "
              :class="currentView === 'phone' ? 'bg-blue-600' : ''"
            >
              <!-- '600px', -->
              <svg
                width="24"
                :class="
                  currentView === 'phone'
                    ? 'text-white'
                    : 'text-neutral-700 dark:text-neutral-500'
                "
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 18H12.01M8 21H16C17.1046 21 18 20.1046 18 19V5C18 3.89543 17.1046 3 16 3H8C6.89543 3 6 3.89543 6 5V19C6 20.1046 6.89543 21 8 21Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          <!-- here is preview form  -->
          <div
            class="justify-center flex gap-6 mx-auto relative overflow-auto content-scroll"
            :class="
              showCode == 'viewcode' ? 'h-full w-full' : 'h-[90%]  w-[90%]'
            "
            v-if="showCode == 'viewform'"
          >
            <img
              :src="imageSource"
              class="m-auto absolute inset-0 h-full customWidth"
              :style="`background: ${setColor}`"
              :class="
                currentView === 'phone'
                  ? 'min-w-[350px]'
                  : currentView === 'tablet'
                  ? 'min-w-[500px]'
                  : 'min-w-[650px]'
              "
              ref="deviceSelector"
            />
            <div
              :class="
                showCode == 'viewcode'
                  ? 'opacity-0 absolute'
                  : 'absolute inset-0 m-auto'
              "
              style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 12px;
                border-radius: 12px;
                height: 80%;
                background: none !important;
              "
            >
              <form :style="updatedFieldStyle">
                <div
                  v-for="(element, index) in formItems"
                  :key="index"
                  style="width: 100%; display: flex; flex-direction: column"
                >
                  <div
                    v-if="element.type === 'text'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>
                    <input
                      @pointerenter="(e) => handleChange(e, index)"
                      :type="element.name"
                      :id="element.label"
                      :placeholder="element.placeholder"
                      :style="element.fieldStyle"
                      :name="element?.name"
                      :required="element.required"
                    />
                  </div>
                  <hr
                    v-if="element.type === 'divider'"
                    :style="element.style"
                    @pointerenter="(e) => handleChange(e, index)"
                  />
                  <div
                    v-if="element.type === 'spacer'"
                    :style="element.style"
                  ></div>
                  <div
                    v-else-if="element.type === 'textarea'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>
                    <textarea
                      @pointerenter="(e) => handleChange(e, index)"
                      :style="element.fieldStyle"
                      :name="element?.name"
                      :placeholder="element.label"
                      :required="element.required"
                    />
                  </div>
                  <div
                    v-else-if="element.type === 'image'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <img
                      :src="element.src"
                      alt="silhouette photo of person standing"
                      class="tB6UZ a5VGX"
                      :style="element.style"
                    />
                  </div>
                  <div
                    v-else-if="
                      element.type === 'select' && showCode == 'viewcode'
                    "
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>

                    <select
                      @pointerenter="(e) => handleChange(e, index)"
                      style="
                        padding: 12px 16px;
                        border: 1px solid #d4d4d4;
                        border-radius: 6px;
                      "
                      :multiple="element.multiple"
                      :name="element?.name"
                      :id="element?.selectId"
                      :required="element.required"
                    >
                      <option
                        v-for="option in element.options"
                        :value="option.value"
                        :key="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                  <div
                    v-else-if="
                      element.type === 'select' && showCode == 'viewform'
                    "
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>

                    <select
                      @pointerenter="(e) => handleChange(e, index)"
                      style="
                        padding: 12px 16px;
                        border: 1px solid #d4d4d4;
                        border-radius: 6px;
                      "
                      :multiple="element.multiple"
                      :name="element?.name"
                      :id="element?.selectId"
                      :required="element.required"
                    >
                      <option
                        v-if="element?.webinarSelect"
                        v-for="option in normalizedWebinarNames"
                        :value="option.value"
                        :key="option"
                      >
                        {{ option.label }}
                      </option>
                      <option
                        v-else
                        v-for="option in element.options"
                        :value="option.value"
                        :key="option.label"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                  <a
                    v-if="
                      element.type === 'heading' && element.link['url'] != null
                    "
                    :href="element.link['url']"
                    :target="element.link?.target || '_self'"
                    @pointerenter="(e) => handleChange(e, index)"
                  >
                    <component
                      :is="element.headingStyle"
                      :style="element.style"
                    >
                      {{ element.label }}
                    </component>
                  </a>
                  <component
                    :is="element.headingStyle"
                    v-else-if="element.type === 'heading'"
                    @pointerenter="(e) => handleChange(e, index)"
                    :style="element.style"
                  >
                    {{ element.label }}
                  </component>
                  <a
                    v-if="
                      element.type === 'paragraph' &&
                      element.link['url'] != null
                    "
                    :href="element.link['url']"
                    :target="element.link?.target || '_self'"
                    @pointerenter="(e) => handleChange(e, index)"
                  >
                    <p :style="element.style">
                      {{ element.label }}
                    </p>
                  </a>
                  <p
                    v-else-if="element.type === 'paragraph'"
                    @pointerenter="(e) => handleChange(e, index)"
                    :style="element.style"
                  >
                    {{ element.label }}
                  </p>

                  <div
                    v-if="element.type === 'checkbox'"
                    style="display: flex; gap: 6px; flex-direction: column"
                  >
                    <div v-if="element.heading" :style="element.fieldStyle">
                      {{ element.heading }}
                    </div>
                    <div style="display: flex; gap: 6px; align-items: center">
                      <input
                        type="checkbox"
                        :name="element.name"
                        @pointerenter="(e) => handleChange(e, index)"
                      />
                      <p :style="element.style">
                        {{ element.label
                        }}<span
                          v-if="element?.required == true"
                          style="color: #dc2626"
                          >{{ " *" }}</span
                        >
                      </p>
                    </div>
                  </div>

                  <div
                    v-if="element.type === 'date'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>

                    <input
                      type="date"
                      name="date"
                      :required="element.required"
                      @pointerenter="(e) => handleChange(e, index)"
                      :style="element.fieldStyle"
                      :min="element.min"
                      :max="element.max"
                    />
                  </div>
                  <div
                    v-if="element.type === 'email'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      :style="element.fieldStyle"
                      :name="element?.name"
                      :placeholder="element.label"
                      @pointerenter="(e) => handleChange(e, index)"
                    />
                  </div>
                  <div
                    v-if="element.type === 'container'"
                    style="
                      display: grid;
                      grid-template-columns: repeat(2, 1fr);
                      gap: 6px;
                    "
                  >
                    <ReusableUiModalsFormBuilderMyContainer
                      :formItems="element.elements"
                    ></ReusableUiModalsFormBuilderMyContainer>
                  </div>

                  <button
                    v-if="element.type === 'button'"
                    :style="element.style"
                    @pointerenter="(e) => handleChange(e, index)"
                    :onmouseover="element.mouseover"
                    :onmouseout="element.mouseout"
                    type="submit"
                    value="Register Now"
                    id="registernow"
                  >
                    {{ element.label }}
                  </button>
                </div>
              </form>
            </div>
            <!-- Here is the code mirror  -->
            <div
              class="w-full mx-auto flex flex-col gap-3 h-full"
              :class="showCode == 'viewcode' ? 'absolute' : 'hidden'"
            >
              <TimelinesCompsCodeCompsCodeMirror
                v-model="generatedHTML"
                height="100%"
              />
            </div>
          </div>

          <!-- here is generated code inner HTML -->

          <div
            class="justify-center flex gap-6 mx-auto relative overflow-auto content-scroll"
            :class="
              showCode == 'viewcode' ? 'h-full w-full' : 'h-[90%]  w-[90%]'
            "
            v-if="showCode == 'viewcode'"
          >
            <img
              :src="imageSource"
              class="m-auto absolute inset-0 h-full customWidth"
              :style="`background: ${setColor}`"
              :class="
                currentView === 'phone'
                  ? 'min-w-[350px]'
                  : currentView === 'tablet'
                  ? 'min-w-[500px]'
                  : 'min-w-[650px]'
              "
              ref="deviceSelector"
            />
            <div
              :class="
                showCode == 'viewcode'
                  ? 'opacity-0 absolute'
                  : 'absolute inset-0 m-auto'
              "
              ref="myForm"
              style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 12px;
                border-radius: 12px;
                height: 80%;
                background: none !important;
              "
            >
              <form :style="updatedFieldStyle">
                <div
                  v-for="(element, index) in formItems"
                  :key="index"
                  style="width: 100%; display: flex; flex-direction: column"
                >
                  <div
                    v-if="element.type === 'text'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>
                    <input
                      @pointerenter="(e) => handleChange(e, index)"
                      :type="element.name"
                      :id="element.label"
                      :placeholder="element.placeholder"
                      :style="element.fieldStyle"
                      :name="element?.name"
                      :required="element.required"
                    />
                  </div>
                  <hr
                    v-if="element.type === 'divider'"
                    :style="element.style"
                    @pointerenter="(e) => handleChange(e, index)"
                  />
                  <div
                    v-if="element.type === 'spacer'"
                    :style="element.style"
                  ></div>
                  <div
                    v-else-if="element.type === 'textarea'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>
                    <textarea
                      @pointerenter="(e) => handleChange(e, index)"
                      :style="element.fieldStyle"
                      :name="element?.name"
                      :placeholder="element.label"
                      :required="element.required"
                    />
                  </div>
                  <div
                    v-else-if="element.type === 'image'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <img
                      :src="element.src"
                      alt="silhouette photo of person standing"
                      class="tB6UZ a5VGX"
                      :style="element.style"
                    />
                  </div>
                  <div
                    v-else-if="
                      element.type === 'select' && showCode == 'viewcode'
                    "
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>

                    <select
                      @pointerenter="(e) => handleChange(e, index)"
                      style="
                        padding: 12px 16px;
                        border: 1px solid #d4d4d4;
                        border-radius: 6px;
                      "
                      :multiple="element.multiple"
                      :name="element?.name"
                      :id="element?.selectId"
                      :required="element.required"
                    >
                      <option
                        v-for="option in element.options"
                        :value="option.value"
                        :key="option.value"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                  <div
                    v-else-if="
                      element.type === 'select' && showCode == 'viewform'
                    "
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>

                    <select
                      @pointerenter="(e) => handleChange(e, index)"
                      style="
                        padding: 12px 16px;
                        border: 1px solid #d4d4d4;
                        border-radius: 6px;
                      "
                      :multiple="element.multiple"
                      :name="element?.name"
                      :id="element?.selectId"
                      :required="element.required"
                    >
                      <option
                        v-if="element?.webinarSelect"
                        v-for="option in normalizedWebinarNames"
                        :value="option.value"
                        :key="option"
                      >
                        {{ option.label }}
                      </option>
                      <option
                        v-else
                        v-for="option in element.options"
                        :value="option.value"
                        :key="option.label"
                      >
                        {{ option.label }}
                      </option>
                    </select>
                  </div>
                  <a
                    v-if="
                      element.type === 'heading' && element.link['url'] != null
                    "
                    :href="element.link['url']"
                    :target="element.link?.target || '_self'"
                    @pointerenter="(e) => handleChange(e, index)"
                  >
                    <component
                      :is="element.headingStyle"
                      :style="element.style"
                    >
                      {{ element.label }}
                    </component>
                  </a>
                  <component
                    :is="element.headingStyle"
                    v-else-if="element.type === 'heading'"
                    @pointerenter="(e) => handleChange(e, index)"
                    :style="element.style"
                  >
                    {{ element.label }}
                  </component>
                  <a
                    v-if="
                      element.type === 'paragraph' &&
                      element.link['url'] != null
                    "
                    :href="element.link['url']"
                    :target="element.link?.target || '_self'"
                    @pointerenter="(e) => handleChange(e, index)"
                  >
                    <p :style="element.style">
                      {{ element.label }}
                    </p>
                  </a>
                  <p
                    v-else-if="element.type === 'paragraph'"
                    @pointerenter="(e) => handleChange(e, index)"
                    :style="element.style"
                  >
                    {{ element.label }}
                  </p>

                  <div
                    v-if="element.type === 'checkbox'"
                    style="display: flex; gap: 6px; flex-direction: column"
                  >
                    <div v-if="element.heading" :style="element.fieldStyle">
                      {{ element.heading }}
                    </div>
                    <div style="display: flex; gap: 6px; align-items: center">
                      <input
                        type="checkbox"
                        :name="element.name"
                        @pointerenter="(e) => handleChange(e, index)"
                      />
                      <p :style="element.style">
                        {{ element.label
                        }}<span
                          v-if="element?.required == true"
                          style="color: #dc2626"
                          >{{ " *" }}</span
                        >
                      </p>
                    </div>
                  </div>

                  <div
                    v-if="element.type === 'date'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>

                    <input
                      type="date"
                      name="date"
                      :required="element.required"
                      @pointerenter="(e) => handleChange(e, index)"
                      :style="element.fieldStyle"
                      :min="element.min"
                      :max="element.max"
                    />
                  </div>
                  <div
                    v-if="element.type === 'email'"
                    style="display: flex; flex-direction: column; gap: 6px"
                  >
                    <p :style="element.style">
                      {{ element.label
                      }}<span
                        v-if="element?.required == true"
                        style="color: #dc2626"
                        >{{ " *" }}</span
                      >
                    </p>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      :style="element.fieldStyle"
                      :name="element?.name"
                      :placeholder="element.label"
                      @pointerenter="(e) => handleChange(e, index)"
                    />
                  </div>
                  <div
                    v-if="element.type === 'container'"
                    style="
                      display: grid;
                      grid-template-columns: repeat(2, 1fr);
                      gap: 6px;
                    "
                  >
                    <ReusableUiModalsFormBuilderMyContainer
                      :formItems="element.elements"
                    ></ReusableUiModalsFormBuilderMyContainer>
                  </div>

                  <button
                    v-if="element.type === 'button'"
                    :style="element.style"
                    @pointerenter="(e) => handleChange(e, index)"
                    :onmouseover="element.mouseover"
                    :onmouseout="element.mouseout"
                    type="submit"
                    value="Register Now"
                    id="registernow"
                  >
                    {{ element.label }}
                  </button>
                </div>
              </form>
            </div>
            <!-- Here is the code mirror  -->
            <div
              class="w-full mx-auto flex flex-col gap-3 h-full"
              :class="showCode == 'viewcode' ? 'absolute' : 'hidden'"
            >
              <TimelinesCompsCodeCompsCodeMirror
                v-model="generatedHTML"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full max-w-[369px] h-full content-scroll overflow-auto"
        v-if="showCode == 'playground'"
      >
        <!-- here we are using the Builder component  -->
        <ReusableUIModalsFormBuilderComponents
          :editBar="editBar"
          :formItems="currentFormItems"
          :formBody="formBody"
          :globalStyles="globalStyles"
          @handleBGColor="(val) => (setColor = val)"
          :BGColor="setColor"
          @updateFormItems="updateContainer"
        />
        <!-- @updateFormItems="(val) => (formItems = val)" -->
      </div>
    </div>
    <ReusableUIToaster
      :showToast="showToast"
      :label="toastMessage"
      :message="toastLabel"
      :status="toastStatus"
    />
  </div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { Clipboard } from "v-clipboard";
import js_beautify from "js-beautify";
import { useSettingsStore } from "~~/store/settings";

// Store configuration
import { useAuthStore } from "~~/store/auth";
const authStore = useAuthStore();
const { getUser } = storeToRefs(authStore);
const settingsStore = useSettingsStore();
const colorMode = useColorMode();
// Api Domain Configuration
let customForms = settingsStore.registrationSettings.customForms
  ? settingsStore.registrationSettings.customForms
  : [];
const config = useRuntimeConfig();
const apiDomain = config.public.apiDomain;

// Props
const props = defineProps({
  initialFormOption: String,
});
const route = useRoute();
// States and variables
const generatedHTML = ref("");
const showCode = ref("playground");
const myForm = ref(null);
const showToolbar = ref("");
const toolBarPosition = ref(0);
const updatedFieldStyle = ref("");
const copyCode = ref("");
const setColor = ref("transparent");
const currentView = ref("desktop");
const imageSource = ref("/icons/desktop_screen.png");
const deviceSelector = ref(null);
const triggerChange = ref("");
const showToast = ref(false);
const toastMessage = ref("");
const toastLabel = ref("");
const toastStatus = ref("info");
const copyText = ref("Copy Code");
const currentWidth = ref("800px");
const formBody = ref({
  display: "grid",
  width: "50%",
  "margin-left": "auto",
  "margin-right": "auto",
  "grid-template-columns": "repeat(1,1fr)",
  gap: "12px",
  "padding-top": "32px",
  "padding-bottom": "32px",
  "padding-left": "32px",
  "padding-right": "32px",
  background: "white",
  "border-radius": "8px",
  overflow: "auto",
  "min-height": "350px",
  "max-height": "100%",
  "box-shadow":
    "0px 4px 6px -1px rgba(0, 0, 0, 0.10), 0px 2px 5px 0px rgba(0, 0, 0, 0.06);",
});

const previewStyles = ref({
  "max-width": "800px",
});
const editBar = ref({
  show: false,
  item: null,
  index: null,
});
const globalStyles = ref({
  color: "#fffff",
  "font-size": "14px",
  background: "",
  "font-family": "Helvetica",
});
const formItems = ref([]);
const currentFormItems = ref([]);
var currentScaleZoomOut = 1;

// Methods and Event Handlers
if (typeof window !== "undefined" && window) {
  window.addEventListener("resize", (e) => {
    triggerChange.value = deviceSelector.value?.clientWidth;
  });
}

const handleWidth = (view, val, source) => {
  currentView.value = view;
  previewStyles.value["max-width"] = `${val}`;
  imageSource.value = source;
};

const ZoomIn = () => {
  var zoomableElement = document.getElementById("zoomableElement");
  currentScaleZoomOut = currentScaleZoomOut + 0.05;
  zoomableElement.style.transform = "scale(" + currentScaleZoomOut + ")";
};
const ZoomOut = () => {
  var zoomableElement = document.getElementById("zoomableElement");
  currentScaleZoomOut =
    currentScaleZoomOut < 0.05 ? 0.05 : currentScaleZoomOut - 0.05;
  zoomableElement.style.transform = "scale(" + currentScaleZoomOut + ")";
};

const handleInitialForm = () => {
  switch (props.initialFormOption) {
    case "one-time":
      formItems.value = oneTimeInitialForm.value;
      break;
    case "multi-option":
      formItems.value = multiOptionInitialForm.value;
      break;
    default:
      formItems.value;
  }
};
// copy code
const handleChange = (event, index) => {
  showToolbar.value = index;
  toolBarPosition.value = event;
};

const showEditBar = (index, item, status, containerIndex = null) => {
  editBar.value.index = index;
  if (containerIndex) {
    editBar.value.item = formItems.value[containerIndex].elements[index];
    currentFormItems.value = formItems.value[containerIndex].elements;
  } else {
    console.log(formItems.value[index], "formItems.value[index]");
    editBar.value.item = formItems.value[index];
    currentFormItems.value = formItems.value;
  }

  if (formItems.value[index] && formItems.value[index]?.type !== "container") {
    editBar.value.show = true;
  }
};

// Lifecycle Events
watch(
  () => {
    const formElement = myForm.value;
    updatedFieldStyle.value = Object.entries(formBody.value)
      .map(([property, value]) => {
        console.log(property, "hitter", showCode.value);
        if (showCode.value === "viewform" && property === "width") {
          return `${property}: ${previewStyles.value["max-width"]}`;
        } else {
          return `${property}: ${value}`;
        }
      })
      .join("; ");
    if (formElement != null) {
      if (formElement != null) {
        // Get the HTML element by its ID or any other method you prefer.
        var removedElement = document.querySelector("form");
        if (removedElement != null) {
          // Remove the data attributes from the form element

          removedElement
            .querySelectorAll("div:not([style])")
            .forEach(function (element) {
              element.outerHTML = element.innerHTML; // Replace the div tag with its content
            });
        }
      }
      var htmlString = removedElement?.innerHTML;
      const finalForm = htmlString?.replace(/<!--v-if-->/g, "");
      generatedHTML.value = `
    <style>
  * {
    font-size: 1em;
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    }
    button:active {
        scale: 1.02;
        transition: all 0.3s ease-in-out;
      }


      select {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

select[multiple] {
  white-space: inherit;
  height: 60px;
  scrollbar-gutter: stable both;
}
select[multiple]:hover {
  overflow-y: auto;
}
option {
  display: inline-block;
  margin: 2px;
  font-size: 12px; /* Reset font size to prevent side effects */
  padding: 6px 12px;
  border: 1px solid #d4d4d4;
  border-radius: 24px;
}
   </style>


    <div style="width: 100%; height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background:${
      setColor.value
    };">
      <form style="${updatedFieldStyle.value}"
       method="POST" action="https://${
         getUser.value?.domain
       }.${apiDomain}/registration" target="_top">
        <div style="width: 100%;display: flex; flex-direction: column;gap:${
          formBody.value.gap
        }">
        ${js_beautify.html(finalForm, {
          indent_size: 2, // Set the desired indent size
          wrap_line_length: 80, // Set the line wrap length
        })}
        <input name="customtag" type="hidden" value="" />
        <input name="customtag2" type="hidden" value="" />
        <input name="customtag3" type="hidden" value="" />
        <input name="customtag4" type="hidden" value="" />
        <input name="customtag5" type="hidden" value="" />
        <input name="webinarid" type="hidden" value="" />
        <input name="wtl" type="hidden" value="${route.params.id}" />
        <input name="lp" type="hidden" value="" />
      </div>
         </form>
           </div>
      `;
      copyCode.value = generatedHTML.value;
    }
  },
  { immediate: true, deep: true }
);

onBeforeMount(() => {
  handleInitialForm();
});

const handleCopy = () => {
  Clipboard.copy(copyCode.value);
  showToast.value = true;
  toastMessage.value = "Code copied!";
  toastLabel.value = "Your code is copied successfully.";
  toastStatus.value = "success";
  copyText.value = "Copied!";
  setTimeout(() => {
    showToast.value = false;
    copyText.value = "Copy Code";
  }, 2000);
};
const updateContainer = (val, index) => {
  formItems.value = [...val];
};

const normalizedWebinarNames = ref([]);
const normalizeWebinarName = (name) => {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const dates = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
    "13th",
    "14th",
    "15th",
    "16th",
  ];

  const replacedName = name.replace(
    /{{!reg-(dayofweek|month|dayofmonth|timeZone)(\d+)}}/g,
    (match, type, index) => {
      switch (type) {
        case "dayofweek":
          return days[(index - 1) % 7];
        case "month":
          return "January";
        case "dayofmonth":
          return dates[(index - 1) % 16];
        case "timeZone":
          return timezones()[getUser.value.timezone]; // Timezone
        default:
          return match;
      }
    }
  );
  return replacedName;
};
const generateWebinarNamesArray = () => {
  normalizedWebinarNames.value = [];
  if (formItems.value) {
    Object.values(formItems.value).forEach((item) => {
      if (item && item.webinarSelect === true) {
        const optionsArray = item.options;
        if (optionsArray) {
          optionsArray.forEach((option) => {
            if (option) {
              const normalizedOption = {
                label: normalizeWebinarName(option.label),
                value: option.value,
              };
              normalizedWebinarNames.value.push(normalizedOption);
            }
          });
        }
      }
    });
  }
};

onBeforeMount(() => {
  handleInitialForm();
  generateWebinarNamesArray();
});
watch(
  () => formItems.value,
  () => {
    generateWebinarNamesArray();
  },
  { deep: true }
);
</script>
<style>
select {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

select[multiple] {
  white-space: inherit;
  height: 60px;
  scrollbar-gutter: stable;
}
select[multiple]:hover {
  overflow-y: auto;
}
option {
  display: inline-block;
  margin: 2px;
  font-size: 12px; /* Reset font size to prevent side effects */
  padding: 6px 12px;
  border: 1px solid #d4d4d4;
  border-radius: 24px;
}
</style>
