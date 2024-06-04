import React from 'react';
import { Head, useForm, usePage } from '@inertiajs/inertia-react';
import AuthLayout from '@/Layouts/AuthLayout';
import { Inertia } from '@inertiajs/inertia';
import AlertAuth from '@/Components/AlertAuth';

interface PageProps {
  title: string;
  session: {
    message: string;
    message_type: string;
  };
  errors?: {
    email?: string;
    password?: string;
  };
}

const Login: React.FC = () => {
  // @ts-ignore
  const { props } = usePage<PageProps>();
  const { title, session, errors } = props;

  const { data, setData } = useForm({
     email: '',
     password: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     // @ts-ignore
     const { name, value } = e.target;
     // @ts-ignore
     setData(name, value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
   e.preventDefault();

   Inertia.post('/login', data, { forceFormData: true });
  }

  return (
    <AuthLayout>
      <Head title={title} />
      
      <div className="bg-gradient-to-r from-rose-100 to-teal-100">
        <div className="h-screen w-screen flex justify-center items-center">
          <div className="2xl:w-1/4 lg:w-1/3 md:w-1/2 w-full">
            {session.message && (
              // @ts-ignore
              <AlertAuth message={session.message} type={session.message_type}/>
            )}

            <div className="card overflow-hidden sm:rounded-md rounded-none">
              <form onSubmit={handleSubmit} method="post" className="p-6">
                <a href="/" className="block mb-8">
                  <img src="/assets/images/small/plant.jpg" alt="Logo" className="h-10 block" />
                </a>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600" htmlFor="LoggingEmailAddress">Email Address</label>
                  <input id="LoggingEmailAddress" className="form-input" type="email" name="email" placeholder="Enter your email" autoComplete="off" value={data.email} onChange={handleInputChange} />
                  {errors?.email && (
                    <div className="pristine-error text-help" role="alert">{errors.email}</div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600" htmlFor="loggingPassword">Password</label>
                  <input id="loggingPassword" className="form-input" type="password" name="password" placeholder="Enter your password" onChange={handleInputChange} />
                  {errors?.password && (
                    <div className="pristine-error text-help" role="alert">{errors.password}</div>
                  )}
                </div>

                <div className="flex justify-center mb-6">
                  <button type='submit' className="btn w-full text-white bg-primary">Log In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
