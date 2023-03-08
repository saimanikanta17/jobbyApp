import {AiFillStar} from 'react-icons/ai'

const SimilarJobItem = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = job

  return (
    <li className="job-card">
      <div className="company-card">
        <img
          className="logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="title-card">
          <h1 className="title">{title}</h1>
          <div className="rating-card">
            <AiFillStar fill=" #fbbf24" size="20px" />
            <p>{rating}</p>
          </div>
        </div>
      </div>
      <h1>Description</h1>
      <p>{jobDescription}</p>
      <div className="employment-card">
        <div className="location">
          <p>{location}</p>
        </div>
        <div className="type">
          <p>{employmentType}</p>
        </div>
        <div>
          <p>{packagePerAnnum}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
