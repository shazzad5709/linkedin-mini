import { Card, Input, Button, Typography } from '@material-tailwind/react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-hot-toast'
const backend = 'http://localhost:5000'

export default function Register({ onButtonClick }) {
  const form = useForm();
  const {
    register,
    handleSubmit,
    formState,
  } = form

  const { errors } = formState
  const onSubmit = async(data) => {
    await axios.post(`${backend}/register`, {
      name: data.name,
      email: data.email,
      password: data.password
    })
    .then((response) => {
      toast.success('Registered successfully')
      window.location.href = '/'
      console.log(response);
    })
    .catch((error) => {
      if (error.response.status === 450) {
        alert('Email already exists')
      }
      console.log(error.response.data)
    })
  }

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h3' color='blue'>
        Sign Up
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'>
        Enter your details to register.
      </Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-4 mb-2 w-80 max-w-screen-lg sm:w-96'
      >
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            variant='standard'
            size='lg'
            label='Name'
            id='name'
            {...register('name', { required: {value: true, message: 'Name is required'} })}
          />
          {errors && errors.name && (
            <p className='text-red-600 leading-normal text-sm mt-[-6px]'>
            {errors.name?.message}
          </p>
          )}
          <Input
            variant='standard'
            size='lg'
            type='email'
            label='Email'
            id='email'
        {...register('email', { required: {value: true, message: 'Email required'} })}
          />
          {errors && errors.email && (
            <p className='text-red-600 leading-normal text-sm mt-[-6px]'>
            {errors.email?.message}
          </p>
          )}
          <Input
            variant='standard'
            type='password'
            size='lg'
            label='Password'
            id='password'
            {...register('password', { required: {value: true, message: 'Password required'} })}
          />
          {errors && errors.password && (
            <p className='text-red-600 leading-normal text-sm mt-[-6px]'>
            {errors.password?.message}
          </p>
          )}
        </div>
        <Button
          type='submit'
          ripple={true}
          className='mt-6 tracking-[2px] text-sm rounded-full'
          fullWidth
        >
          Sign Up
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          Already have an account?{' '}
          <Button onClick={onButtonClick} size='lg' variant='text'>
            Sign In
          </Button>
        </Typography>
      </form>
    </Card>
  );
}
