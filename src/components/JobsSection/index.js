import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsSearch} from 'react-icons/bs'

import JobItem from '../JobItem'

import Header from '../Header'

import FilterSection from '../FilterSection'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobsSection extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    profileStatus: apiStatusConstants.initial,
    profileData: {},
    employment: '',
    salary: '',
    search: '',
  }

  componentDidMount() {
    this.getJobsList()
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({
      profileStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const data = {
        name: fetchedData.profile_details.name,
        profileImageUrl: fetchedData.profile_details.profile_image_url,
        shortBio: fetchedData.profile_details.short_bio,
      }
      this.setState({
        profileData: data,
        profileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobsList = async () => {
    const {employment, search, salary} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employment}&minimum_package=${salary}&search=${search}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const jobsData = fetchedData.jobs.map(data => ({
        companyLogoUrl: data.company_logo_url,
        employmentType: data.employment_type,
        jobDescription: data.job_description,
        location: data.location,
        packagePerAnnum: data.package_per_annum,
        rating: data.rating,
        title: data.title,
        id: data.id,
      }))
      this.setState({
        jobsList: jobsData,
        apiStatus: apiStatusConstants.success,
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

  renderJobsView = () => {
    const {jobsList} = this.state
    return (
      <ul className="job-list-container">
        {jobsList.map(jobDetail => (
          <JobItem key={jobDetail.id} jobDetail={jobDetail} />
        ))}
      </ul>
    )
  }

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
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
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

  renderProfile = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case apiStatusConstants.inProgress:
        return this.renderProfileLoadingView()
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderProfileLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileFailureView = () => (
    <button type="button" onClick={this.getProfile}>
      Retry
    </button>
  )

  renderProfileView = () => {
    const {profileData} = this.state
    const {profileImageUrl, name, shortBio} = profileData
    return (
      <div className="profile-card">
        <img src={profileImageUrl} alt="profile" />
        <h1>{name}</h1>
        <p>{shortBio}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="job-container">
        <Header />
        <div className="sub-container">
          <div className="left-container">
            {this.renderProfile()}
            <FilterSection />
          </div>
          <div>
            <div>
              <input type="search" />
              <button type="button" data-testid="searchButton">
                <BsSearch className="search-icon" />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default JobsSection
