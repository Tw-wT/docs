import Head from 'next/head'
import Link from 'next/link'
import LoginForm from "../components/Forms/LoginForm/LoginForm"
import MainLayout from "../components/MainLayout/MainLayout"
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <LoginForm />
  )
}
