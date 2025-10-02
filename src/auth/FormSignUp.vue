<template>
  <div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <!-- Header -->
        <div class="text-center mb-6">
          <h1 class="text-3xl font-bold text-base-content">Create Account</h1>
          <p class="text-base-content/70 mt-2">Join thousands of happy shoppers</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <!-- Name Fields -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">First Name</span>
              </label>
              <input
                v-model="form.firstName"
                type="text"
                placeholder="John"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.firstName }"
                required
              />
              <label v-if="errors.firstName" class="label">
                <span class="label-text-alt text-error">{{ errors.firstName }}</span>
              </label>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Last Name</span>
              </label>
              <input
                v-model="form.lastName"
                type="text"
                placeholder="Doe"
                class="input input-bordered w-full"
                :class="{ 'input-error': errors.lastName }"
                required
              />
              <label v-if="errors.lastName" class="label">
                <span class="label-text-alt text-error">{{ errors.lastName }}</span>
              </label>
            </div>
          </div>

          <!-- Email -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email Address</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              placeholder="john@example.com"
              class="input input-bordered w-full"
              :class="{ 'input-error': errors.email }"
              required
            />
            <label v-if="errors.email" class="label">
              <span class="label-text-alt text-error">{{ errors.email }}</span>
            </label>
          </div>

          <!-- Password -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="input input-bordered w-full pr-12"
                :class="{ 'input-error': errors.password }"
                required
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/50 hover:text-base-content"
              >
                <svg v-if="showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L8.464 8.464M9.878 9.878a3 3 0 00-.007 4.243m4.242-4.242L15.536 8.464M14.122 14.121a3 3 0 01-4.243 0M14.122 14.121l1.414 1.414" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <label v-if="errors.password" class="label">
              <span class="label-text-alt text-error">{{ errors.password }}</span>
            </label>
            <label v-else class="label">
              <span class="label-text-alt">Must be at least 8 characters</span>
            </label>
          </div>

          <!-- Confirm Password -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="input input-bordered w-full"
              :class="{ 'input-error': errors.confirmPassword }"
              required
            />
            <label v-if="errors.confirmPassword" class="label">
              <span class="label-text-alt text-error">{{ errors.confirmPassword }}</span>
            </label>
          </div>

          <!-- Terms and Conditions -->
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-3">
              <input
                v-model="form.acceptTerms"
                type="checkbox"
                class="checkbox checkbox-primary"
                :class="{ 'checkbox-error': errors.acceptTerms }"
                required
              />
              <span class="label-text">
                I agree to the 
                <a href="#" class="link link-primary">Terms of Service</a> 
                and 
                <a href="#" class="link link-primary">Privacy Policy</a>
              </span>
            </label>
            <label v-if="errors.acceptTerms" class="label">
              <span class="label-text-alt text-error">{{ errors.acceptTerms }}</span>
            </label>
          </div>

          <!-- Newsletter Subscription -->
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-3">
              <input
                v-model="form.newsletter"
                type="checkbox"
                class="checkbox checkbox-secondary"
              />
              <span class="label-text">Subscribe to our newsletter for exclusive deals</span>
            </label>
          </div>

          <!-- Submit Button -->
          <div class="form-control mt-6">
            <button
              type="submit"
              class="btn btn-primary btn-lg w-full"
              :class="{ 'loading': isLoading }"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">Create Account</span>
              <span v-else>Creating Account...</span>
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div class="divider">OR</div>

        <!-- Social Login -->
        <div class="space-y-3">
          <button class="btn btn-outline w-full">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button class="btn btn-outline w-full">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continue with Facebook
          </button>
        </div>

        <!-- Login Link -->
        <div class="text-center mt-6">
          <p class="text-base-content/70">
            Already have an account? 
            <a href="#" class="link link-primary font-medium">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false,
  newsletter: false
})

// Form state
const isLoading = ref(false)
const showPassword = ref(false)
const errors = reactive({})

// Validation function
const validateForm = () => {
  const newErrors = {}

  // First name validation
  if (!form.firstName.trim()) {
    newErrors.firstName = 'First name is required'
  }

  // Last name validation
  if (!form.lastName.trim()) {
    newErrors.lastName = 'Last name is required'
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!emailRegex.test(form.email)) {
    newErrors.email = 'Please enter a valid email address'
  }

  // Password validation
  if (!form.password) {
    newErrors.password = 'Password is required'
  } else if (form.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }

  // Confirm password validation
  if (!form.confirmPassword) {
    newErrors.confirmPassword = 'Please confirm your password'
  } else if (form.password !== form.confirmPassword) {
    newErrors.confirmPassword = 'Passwords do not match'
  }

  // Terms validation
  if (!form.acceptTerms) {
    newErrors.acceptTerms = 'You must accept the terms and conditions'
  }

  // Clear previous errors and set new ones
  Object.keys(errors).forEach(key => delete errors[key])
  Object.assign(errors, newErrors)

  return Object.keys(newErrors).length === 0
}

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isLoading.value = true

  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Handle successful signup
    console.log('Signup successful:', form)
    
    // Reset form or redirect user
    // router.push('/welcome')
    
  } catch (error) {
    console.error('Signup failed:', error)
    // Handle error (show toast, etc.)
  } finally {
    isLoading.value = false
  }
}
</script>
