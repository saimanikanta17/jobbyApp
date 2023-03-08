import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import './index.css'

const JobItem = props => {
  const {jobDetail} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetail
  return (
    <li className="job-card">
      <Link to={`/jobs/${id}`} className="link-item">
        <div className="company-card">
          <img className="logo" src={companyLogoUrl} alt="company logo" />
          <div className="title-card">
            <p className="title">{title}</p>
            <div className="rating-card">
              <AiFillStar fill=" #fbbf24" size="20px" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
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
        <h1>Description</h1>
        <p>{jobDescription}</p>
      </Link>
    </li>
  )
}

export default JobItem
