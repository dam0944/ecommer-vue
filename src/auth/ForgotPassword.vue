<template>
  <div class="container d-flex justify-content-center align-items-center" style="min-height: 100vh;">
    <div class="w-100" style="max-width: 700px;">
      <div class="mb-4 mt-5">
        <h2 class="fw-bold">Forgot your password?</h2>
        <p class="mt-3 mb-2">
          Change your password in three easy steps. This helps to keep your new password secure.
        </p>
        <ol class="mb-4">
          <li>Use your registered identity. (Phone/Email)</li>
          <li>We will send you a temporary OTP in your reference.</li>
          <li>Use the OTP code to change your password on our secure website.</li>
        </ol>
      </div>
      <div class="card p-4 border rounded shadow-sm">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="identity" class="form-label fw-semibold">Phone / Email</label>
            <input
              type="text"
              v-model="identity"
              class="form-control"
              id="identity"
              placeholder="Enter your phone or email"
              required
            />
            <div class="form-text">
              * Must use country code before phone number
            </div>
          </div>
          <button type="submit" class="btn btn-primary">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      identity: "",
    };
  },
  methods: {
    onSubmit() {
      // Implement OTP send logic here
      alert("OTP sent to: " + this.identity);
    },
  },
};
</script>

<style scoped>
.card {
  background: #fff;
  border: 1px solid #f0f0f4;
}
ol {
  padding-left: 1.25rem;
}
</style>