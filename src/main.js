import './style.css'

const WORD_LIMIT = 1150

const modules = [
  {
    id: 'module1',
    label: 'Module 1',
    title: 'Contributions to the generation of new ideas, tools, methodologies or knowledge',
  },
  {
    id: 'module2',
    label: 'Module 2',
    title: 'The development of others and maintenance of effective working relationships',
  },
  {
    id: 'module3',
    label: 'Module 3',
    title: 'Contributions to the wider research and innovation community',
  },
  {
    id: 'module4',
    label: 'Module 4',
    title: 'Contributions to broader research or innovation users and audiences, and towards wider societal benefit',
  },
]

function countWords(text) {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length
}

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gray-50 py-10 px-4">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Narrative CV Word Counter</h1>
      <p class="text-gray-500 mb-8">Total word limit: <span class="font-semibold">${WORD_LIMIT} words</span></p>

      <div class="space-y-6">
        ${modules.map(m => `
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <label for="${m.id}" class="block mb-1">
              <span class="text-xs font-semibold uppercase tracking-wide text-indigo-600">${m.label}</span>
              <span class="block text-base font-medium text-gray-800 mt-0.5">${m.title}</span>
            </label>
            <textarea
              id="${m.id}"
              rows="6"
              placeholder="Enter your text here..."
              class="mt-3 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent resize-y transition"
            ></textarea>
            <p class="mt-2 text-sm text-gray-500 text-right">
              Word count: <span id="${m.id}-count" class="font-semibold text-gray-700">0</span>
            </p>
          </div>
        `).join('')}
      </div>

      <div id="total-banner" class="mt-8 rounded-xl p-5 flex items-center justify-between border transition-colors bg-white border-gray-200 shadow-sm">
        <span class="text-base font-medium text-gray-700">Total word count</span>
        <span id="total-count" class="text-2xl font-bold text-gray-900">0 / ${WORD_LIMIT}</span>
      </div>

      <div id="alert-banner" class="hidden mt-4 rounded-xl p-4 bg-red-50 border border-red-300 text-red-700 text-sm font-medium">
        Your total word count exceeds the ${WORD_LIMIT}-word limit. Please reduce your text.
      </div>
    </div>
  </div>
`

function update() {
  let total = 0

  modules.forEach(m => {
    const textarea = document.getElementById(m.id)
    const count = countWords(textarea.value)
    total += count
    document.getElementById(`${m.id}-count`).textContent = count
  })

  const totalEl = document.getElementById('total-count')
  const banner = document.getElementById('total-banner')
  const alert = document.getElementById('alert-banner')

  totalEl.textContent = `${total} / ${WORD_LIMIT}`

  if (total > WORD_LIMIT) {
    totalEl.classList.remove('text-gray-900')
    totalEl.classList.add('text-red-600')
    banner.classList.remove('bg-white', 'border-gray-200')
    banner.classList.add('bg-red-50', 'border-red-300')
    alert.classList.remove('hidden')
  } else {
    totalEl.classList.remove('text-red-600')
    totalEl.classList.add('text-gray-900')
    banner.classList.remove('bg-red-50', 'border-red-300')
    banner.classList.add('bg-white', 'border-gray-200')
    alert.classList.add('hidden')
  }
}

modules.forEach(m => {
  document.getElementById(m.id).addEventListener('input', update)
})
