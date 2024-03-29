import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterSection = props => {
  const {employmentString, salaryRange} = props
  const addTypes = event => {
    const isChecked = event.target.checked
    const type = event.target.value
    employmentString(isChecked, type)
  }
  const changeRange = event => {
    salaryRange(event.target.value)
  }

  return (
    <div>
      <h1>Type of Employment</h1>
      <ul className="filter-container">
        {employmentTypesList.map(eachType => (
          <li key={eachType.label}>
            <label>
              <input
                type="checkbox"
                value={eachType.employmentTypeId}
                onChange={addTypes}
              />
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
      <h1>Salary Range</h1>
      <ul className="filter-container">
        {salaryRangesList.map(eachRange => (
          <li key={eachRange.label}>
            <label>
              <input
                type="radio"
                name="salary-range"
                value={eachRange.salaryRangeId}
                onChange={changeRange}
              />
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterSection
