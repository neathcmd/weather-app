# Hello

\ <div
              class="bg-transparent text-white rounded-xl p-6 sm:p-8 shadow-xl w-full max-w-lg"
            >
<!-- Weather Content (no loading state since it's static) -->
<div>
<!-- Location and Weather Icon -->
<div class="flex justify-between items-center mb-6">
<div>
<h2 class="font-bold text-2xl sm:text-3xl">Phnom Penh</h2>
<p class="text-gray-300 text-base sm:text-lg">
Today, 10 Mar
</p>
</div>
<div class="text-5xl sm:text-6xl">☁️</div>
</div>

                <!-- Temperature and Weather Condition -->
                <div class="my-6 sm:my-8 text-center">
                  <div class="flex items-center justify-center">
                    <span class="text-7xl sm:text-8xl font-bold">31°</span>
                  </div>
                  <p class="text-xl sm:text-2xl capitalize mt-4">
                    scattered clouds
                  </p>
                  <p class="text-gray-300 mt-2 text-base sm:text-lg">
                    Feels like 34°
                  </p>
                </div>

                <!-- Weather Details (High and Low Temperature) -->
                <div class="border-t border-gray-700 pt-6">
                  <div class="grid grid-cols-2 gap-6">
                    <div class="flex items-center">
                      <svg
                        class="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-orange-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                      </svg>
                      <div>
                        <p class="text-gray-400 text-sm sm:text-base">High</p>
                        <p class="text-lg sm:text-xl">33°</p>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <svg
                        class="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                      <div>
                        <p class="text-gray-400 text-sm sm:text-base">Low</p>
                        <p class="text-lg sm:text-xl">29°</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Sunrise and Sunset -->
                <div class="mt-6 pt-6 border-t border-gray-700">
                  <div class="grid grid-cols-2 gap-6">
                    <div class="flex items-center">
                      <svg
                        class="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <div>
                        <p class="text-gray-400 text-sm sm:text-base">
                          Sunrise
                        </p>
                        <p class="text-lg sm:text-xl">6:00 AM</p>
                      </div>
                    </div>
                    <div class="flex items-center">
                      <svg
                        class="h-6 w-6 sm:h-7 sm:w-7 mr-3 text-orange-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                        />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <div>
                        <p class="text-gray-400 text-sm sm:text-base">Sunset</p>
                        <p class="text-lg sm:text-xl">6:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Error div (hidden by default, can be shown manually if needed) -->
              <div id="error" class="hidden">Failed to load weather data</div>
            </div>
