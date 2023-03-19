import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'

import Cookies from 'js-cookie'

import Header from '../Header'

import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const Skill = props => {
  const {skill} = props
  const {imageUrl, name} = skill
  return (
    <li>
      <img src={imageUrl} alt={name} />
      <p>{name}</p>
    </li>
  )
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    lifeAtCompany: {},
    skillList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsData()
  }

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    id: data.id,
  })

  getJobsData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedJobData = this.getFormattedData(fetchedData.job_details)
      const updatedSimilarJobsData = fetchedData.similar_jobs.map(similarJob =>
        this.getFormattedData(similarJob),
      )
      const updatedLifeAtCompany = {
        imageUrl: fetchedData.job_details.life_at_company.image_url,
        description: fetchedData.job_details.life_at_company.description,
      }
      const updatedSkillList = fetchedData.job_details.skills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
      }))
      this.setState({
        jobData: updatedJobData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
        lifeAtCompany: updatedLifeAtCompany,
        skillList: updatedSkillList,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.getJobsData}>
        Retry
      </button>
    </div>
  )

  renderJobsView = () => {
    const {jobData, lifeAtCompany, skillList} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
    } = jobData
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="job-card">
        <div className="company-card">
          <img
            className="logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="title-card">
            <h1 className="title">{title}</h1>
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
        <div>
          <h1>Description</h1>
          <a href={companyWebsiteUrl} target="__blank">
            Visit
          </a>
        </div>
        <p>{jobDescription}</p>
        <h1>Skills</h1>
        <ul>
          {skillList.map(skill => (
            <Skill skill={skill} key={skill.name} />
          ))}
        </ul>
        <h1>Life at Company</h1>
        <div>
          <p>{description}</p>
          <img src={imageUrl} alt="life at company" />
        </div>
      </div>
    )
  }

  renderJob = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {similarJobsData} = this.state
    return (
      <div className="job-container">
        <Header />
        {this.renderJob()}
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobsData.map(job => (
            <SimilarJobItem job={job} key={job.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default JobItemDetails
