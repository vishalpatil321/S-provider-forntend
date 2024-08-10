import React from 'react';

export const userMenu = [
   {
     name:'Home',
     path:'/',
     icon:'fa-solid fa-house'
   },
   {
    name:'Requests',
    path:'/requests',
    icon:'fa-solid fa-list'
  },
  {
    name:'Apply Service',
    path:'/apply-service',
    icon:'fa-solid fa-user-nurse'
  },
  // {
  //   name:'Profile',
  //   path:'/serviceP/profile/:id',
  //   icon:'fa-solid fa-user'
  // },
 
]

export const adminMenu = [
  {
    name:'Home',
    path:'/',
    icon:'fa-solid fa-house'
  },
  {
   name:'Service Providers',
   path:'/admin/service-providers',
   icon:'fa-solid fa-list'
 },
 
 {
   name:'Users',
   path:'/admin/users',
   icon:'fa-solid fa-user'
 },

]