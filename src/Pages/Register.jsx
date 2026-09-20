import React from 'react'
import axios from 'axios';

const Register = () => {
   const [email, setEmail] = React.useState('');
   const [password, setPassword] = React.useState('');
   const [confirmPassword, setConfirmPassword] = React.useState('');
   const [username, setUsername] = React.useState('');
   const [fullname, setFullname] = React.useState('');

   const handleSubmit = async(e) => {
      e.preventDefault();
      if (password !== confirmPassword) {
         window.alert("Passwords do not match!");
         return;
      }

      axios.post('http://localhost:8080/api/auth/register', {
         username: username,
         email: email,
         password: password
      })
      .then((response) => {
         window.alert("Registration successful!");
         window.location.href = "/login";
      })
      .catch((error) => {
         window.alert("Registration failed. Please try again.");
      });
   }
  return (
    <div>
        <main class="px-4 md:px-8 min-h-screen flex flex-col items-center justify-center">
   <div class="max-w-md w-full">
      <div
         class="p-6 rounded-lg bg-white border border-slate-300 shadow-xs md:p-6 dark:bg-neutral-800 dark:border-neutral-700">
         <h1 class="text-slate-900 text-center text-2xl font-bold dark:text-slate-50">Create an account</h1>

         <form class="space-y-6 mt-10" onSubmit={handleSubmit}>
            <div>
               <label for="fullname"
                  class="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Full Name</label>
               <input type="text" id="fullname" name="fullname" placeholder="John Doe" required value={fullname} onChange={(e) => setFullname(e.target.value)}
                  class="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
            </div>
            <div>
               <label for="username"
                  class="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Username</label>
               <input type="text" id="username" name="username" placeholder="john_doe" required value={username} onChange={(e) => setUsername(e.target.value)}
                  class="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
            </div>
            <div>
               <label for="email"
                  class="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Email</label>
               <input type="email" id="email" name="email" placeholder="john@readymadeui.com" required value={email} onChange={(e) => setEmail(e.target.value)}
                  class="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
            </div>
            <div>
               <label for="password"
                  class="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Password</label>
               <input type="password" id="password" name="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)}
                  class="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
            </div>
            <div>
               <label for="confirm-password"
                  class="mb-2 text-slate-900 font-medium text-sm inline-block dark:text-slate-50">Confirm
                  password</label>
               <input type="password" id="confirm-password" name="confirm-password" placeholder="••••••••" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                  class="px-3 py-2.5 text-sm text-slate-900 rounded-md bg-white w-full outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-600 dark:text-slate-50 dark:bg-neutral-700 dark:outline-neutral-600" />
            </div>

            <button type="submit"
               class="w-full py-2 px-3.5 text-sm rounded-md font-semibold cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
               Create an account</button>
         </form>

         <div class="mt-6 text-slate-900 text-sm text-center dark:text-slate-50">Already have an account? <a href="/login  "
               class="text-blue-700 hover:underline ml-1 font-medium dark:text-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded">
               Login here</a>
         </div>
      </div>
   </div>
</main>
    </div>
  )
}

export default Register