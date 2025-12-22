'use server'

import { revalidateTag } from 'next/cache'

// Revalidate specific tags
export async function revalidateContentCards() {
    revalidateTag('content-cards', 'default');
}

export async function revalidateServiceSection() {
  revalidateTag('service-section','default')
}

export async function revalidateServices() {
  revalidateTag('services','default')
}

export async function revalidateProjects() {
  revalidateTag('projects','default')
}

// Revalidate multiple tags at once
export async function revalidateTags(tags: string[]) {
  tags.forEach(tag => {
    revalidateTag(tag,'default')
  })
}










