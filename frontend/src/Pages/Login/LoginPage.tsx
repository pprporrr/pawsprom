import styles from './LoginPage.module.css'
import { Form, redirect } from 'react-router-dom'
import { baseAPI } from '../../main';

export async function action({ request }: { request: any }) {
  const formData = await request.formData()
  const updates = Object.fromEntries(formData)
  await baseAPI.post('/userAPI/login', updates)
    .then((response) => {
      console.log(response.data.data)
      const clientUsername = response.data.data.username
      const clientRole = response.data.data.role
      localStorage.setItem('ID', JSON.stringify({
        username: clientUsername,
        role: clientRole
      }))
    })
  return redirect(`/search`)
}

export const LoginPage = () => {
  return (
    <div className={styles.container}>
      <h1>PawsPr้om</h1>
      <Form method='post'>
        <section>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id='username' name='username' required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name='password' required />
          </div>
        </section>
        <button >Log in</button>
      </Form>
      <p>Don't have account? <a href="/signup"> Sign up</a></p>
    </div>
  )
}
