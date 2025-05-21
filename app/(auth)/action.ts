'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'


import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()
  const cookieStore = cookies()
  const all = (await cookieStore).getAll();
  const redirectTo =  (await cookieStore).get("redirectTo")?.value;
  // console.log("redirect To ",redirectTo.filter(item=>item.name === "redirectTo"))
  console.log("rediret to ",redirectTo)
  console.log("all" , all)

  // type-casting here for convenience
  // // in practice, you should validate your inputsd
  // const data = {
  //   email: formData.get('email') as string,
  //   password: formData.get('password') as string,
  // }

  // const { error } = await supabase.auth.signInWithPassword(data)

  // if (error) {
  //   redirect('/error')
  // }

  // revalidatePath('/', 'layout')
  // redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}