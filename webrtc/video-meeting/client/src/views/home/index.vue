<script setup>
import { useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

const router = useRouter()

router.replace(`/${uuidv4()}`)
</script>

<template>redirect ...</template>
