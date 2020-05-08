import React, { Component } from 'react'

import ProjectCard from './ProjectCard'

import { projects } from './projectlist'

const getFilters = (projects) =>
{
    let allFilters = []
    projects.forEach(project =>
    {
        allFilters = allFilters.concat(project.filters)
    })
    const uniqueSet = new Set(allFilters)
    return [...uniqueSet]
}

const uniqueFilters = getFilters(projects)

export default class Projects extends Component
{

    state = {
        projects: [],
        filter: null
    }

    filterArray = (filter) =>
    {
        let newArray = projects.filter(element =>
        {
            let match = false
            element.filters.forEach(elementfilter =>
            {
                if (elementfilter === filter)
                    match = true
            })
            return match
        })
        this.setState({
            projects: newArray,
            filter: filter
        })
    }

    resetArray = () =>
    {
        this.setState({
            projects: projects,
            filter: null
        })
    }

    componentDidMount()
    {
        this.setState({
            projects: projects,
            filter: null
        })
    }

    render()
    {
        return (
            <React.Fragment>

                <div className="flex flex-wrap font-mono text-sm md:text-lg justify-center">
                    {/* <span className="text-center">Filter</span> */}
                    <button className="link-pink" onClick={() => { this.resetArray() }}>All</button>
                    {uniqueFilters.map((filter, index) => (
                        <button key={index} className="link-pink capitalize mx-1" onClick={() =>
                        {
                            this.filterArray(filter.toLowerCase())
                        }}>{filter}</button>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center">

                    {this.state.projects.map((project, index) => (
                        <ProjectCard key={index} project={project} randomRotation={this.props.randomRotation} />
                    ))}


                </div>


            </React.Fragment>

        )
    }
}