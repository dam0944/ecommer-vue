<template>
  <div class="min-h-screen flex items-center justify-center bg-base-200">
    <div class="card w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
        <h2 class="text-center text-2xl font-bold">Sign In</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              type="email"
              v-model="form.email"
              placeholder="you@example.com"
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Password -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              type="password"
              v-model="form.password"
              placeholder="••••••••"
              class="input input-bordered w-full"
              required
            />
            <label class="label">
              <a href="#" class="label-text-alt link link-hover">Forgot password?</a>
            </label>
          </div>

          <!-- Remember Me -->
          <div class="form-control">
            <label class="cursor-pointer flex items-center space-x-2">
              <input type="checkbox" v-model="form.remember" class="checkbox checkbox-primary" />
              <span class="label-text">Remember me</span>
            </label>
          </div>

          <!-- Submit Button -->
          <div class="form-control mt-4">
            <!-- <router-link to="/signup" > -->
              <button type="submit" class="btn btn-primary w-full">Sign In</button>
            <!-- </router-link> -->
          </div>
        </form>

        <!-- Footer -->
        <p class="text-center text-sm mt-4">
          Don’t have an account?
          <router-link to="/signup" >
            <a href="#" class="link link-primary">Sign up</a>
          </router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

function handleLogin() {
  console.log('Login form submitted:', form)
  // Add your login API request here
}
</script>
