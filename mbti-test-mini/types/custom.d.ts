interface Option {
  result: string
  value: string
  key: string
}

interface Question {
  options: Option[]
  title: string
}
