<script setup lang="ts">
import { ref } from 'vue';
import { Send, AlertTriangle } from 'lucide-vue-next';
import MacDots from './MacDots.vue';

// State data form
const name = ref('');
const subject = ref('');
const message = ref('');
const honeypot = ref('');

// State error custom per field
const errors = ref({
  name: '',
  subject: '',
  message: '',
});

// State status pengiriman
const isSubmitting = ref(false);
const statusMessage = ref('');
const isSuccess = ref(false);
const isError = ref(false);

const validateForm = () => {
  let isValid = true;
  errors.value = { name: '', subject: '', message: '' };

  if (!name.value.trim()) {
    errors.value.name = 'ERR: IDENTIFIER REQUIRED';
    isValid = false;
  }
  if (!subject.value.trim()) {
    errors.value.subject = 'ERR: SUBJECT PARAM REQUIRED';
    isValid = false;
  }
  if (!message.value.trim()) {
    errors.value.message = 'ERR: PAYLOAD CANNOT BE EMPTY';
    isValid = false;
  }

  return isValid;
};

const handleSubmit = async () => {
  // 1. Jalankan Validasi Custom
  if (!validateForm()) {
    isError.value = true;
    isSuccess.value = false;
    statusMessage.value = 'ERROR: VALIDATION_FAILED. CHECK INPUT FIELDS.';
    return;
  }

  // Jika honeypot diisi oleh bot, langsung batalkan
  if (honeypot.value !== '') return;

  isSubmitting.value = true;
  isError.value = false;
  isSuccess.value = false;
  statusMessage.value = 'TRANSMITTING DATA TO CENTRAL HUB...';

  try {
    // URL Formspree Asli Kamu
    const response = await fetch('https://formspree.io/f/xykrbeov', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.value,
        _subject: subject.value,
        message: message.value,
      }),
    });

    if (response.ok) {
      isSuccess.value = true;
      isError.value = false;
      statusMessage.value = 'SUCCESS: MESSAGE TRANSMITTED TO AGIS!';
      name.value = '';
      subject.value = '';
      message.value = '';
      errors.value = { name: '', subject: '', message: '' };
    } else {
      isError.value = true;
      isSuccess.value = false;
      statusMessage.value = 'ERROR: TRANSMISSION FAILED. TRY AGAIN.';
    }
  } catch (error) {
    isError.value = true;
    isSuccess.value = false;
    statusMessage.value = 'ERROR: NETWORK CONNECTION FAILURE.';
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div
    class="w-full max-w-2xl bg-surface-container-highest border-4 border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-[24px] overflow-hidden flex flex-col relative z-10"
  >
    <div
      class="bg-background border-b-4 border-primary px-5 py-4 flex items-center justify-between"
    >
      <MacDots size="md" traffic />
      <div class="text-lg font-display font-bold text-primary tracking-tight">
        TERMINAL_COMM.SYS
      </div>
      <div class="w-12"></div>
    </div>

    <div class="p-8 bg-[#e8e3dc] space-y-8">
      <!-- Terminal Log Text (Berubah HIJAU saat berhasil, MERAH saat error) -->
      <div
        class="text-[10px] font-bold tracking-widest leading-relaxed font-mono transition-colors"
        :class="
          isError
            ? 'text-red-600'
            : isSuccess
              ? 'text-green-600'
              : 'text-on-surface-variant'
        "
      >
        &gt; INITIATING SECURE CONNECTION...<br />
        &gt; CONNECTION ESTABLISHED.<br />
        &gt; AWAITING USER INPUT.
        <template v-if="statusMessage">
          <br />
          <span
            :class="
              isError ? 'text-red-600 font-bold' : 'text-green-600 font-bold'
            "
          >
            &gt; {{ statusMessage }}
          </span>
        </template>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit" novalidate>
        <!-- Input Honeypot Rahasia (Anti Bot) -->
        <input
          type="text"
          v-model="honeypot"
          class="hidden"
          tabindex="-1"
          autocomplete="off"
        />

        <!-- Input Identifier -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
          >
            <span class="text-accent-pink">&gt;</span>
            IDENTIFIER_INPUT
          </label>
          <input
            v-model="name"
            type="text"
            placeholder="Enter your name..."
            class="w-full bg-surface-container border-4 border-primary rounded px-4 py-3 text-sm font-bold focus:outline-none focus:border-accent-orange focus:bg-background transition-colors placeholder:opacity-40"
            :class="{ '!border-red-600 !bg-red-50': errors.name }"
            @input="errors.name = ''"
          />
          <div
            v-if="errors.name"
            class="inline-flex items-center gap-1.5 bg-red-500 text-white border-2 border-primary px-2.5 py-1 text-[9px] font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <AlertTriangle :size="12" />
            <span>{{ errors.name }}</span>
          </div>
        </div>

        <!-- Input Subject -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
          >
            <span class="text-accent-yellow">&gt;</span>
            SUBJECT_PARAM
          </label>
          <input
            v-model="subject"
            type="text"
            placeholder="Query topic..."
            class="w-full bg-surface-container border-4 border-primary rounded px-4 py-3 text-sm font-bold focus:outline-none focus:border-accent-orange focus:bg-background transition-colors placeholder:opacity-40"
            :class="{ '!border-red-600 !bg-red-50': errors.subject }"
            @input="errors.subject = ''"
          />
          <div
            v-if="errors.subject"
            class="inline-flex items-center gap-1.5 bg-red-500 text-white border-2 border-primary px-2.5 py-1 text-[9px] font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <AlertTriangle :size="12" />
            <span>{{ errors.subject }}</span>
          </div>
        </div>

        <!-- Input Message -->
        <div class="space-y-2">
          <label
            class="text-[10px] font-bold tracking-widest uppercase flex items-center gap-2"
          >
            <span class="text-accent-green">&gt;</span>
            MESSAGE_PAYLOAD
          </label>
          <textarea
            v-model="message"
            rows="4"
            placeholder="Type your message here..."
            class="w-full bg-surface-container border-4 border-primary rounded px-4 py-3 text-sm font-bold focus:outline-none focus:border-accent-orange focus:bg-background transition-colors placeholder:opacity-40 resize-none"
            :class="{ '!border-red-600 !bg-red-50': errors.message }"
            @input="errors.message = ''"
          ></textarea>
          <div
            v-if="errors.message"
            class="inline-flex items-center gap-1.5 bg-red-500 text-white border-2 border-primary px-2.5 py-1 text-[9px] font-mono font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <AlertTriangle :size="12" />
            <span>{{ errors.message }}</span>
          </div>
        </div>

        <!-- Tombol Send -->
        <div class="flex justify-end pt-4">
          <button
            type="submit"
            :disabled="isSubmitting"
            class="brutalist-button bg-accent-orange px-8 py-4 text-sm font-bold flex items-center gap-3 group cursor-pointer disabled:opacity-50"
          >
            {{ isSubmitting ? 'TRANSMITTING...' : 'EXECUTE_SEND' }}
            <Send
              :size="18"
              class="group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
            />
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
