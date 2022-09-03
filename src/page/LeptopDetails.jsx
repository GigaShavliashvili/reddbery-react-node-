import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { baseUrl } from '../configs/api'
import { userInfoTitle, laptopBasicInfoTitle, cpuInfoTitle, otherInfoTitle } from '../assets/lists'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrandsData, fetchTeamsData, fetchPositionData } from '../fetchData/fetchGeneralData'
import List from '../components/List'
const LeptopDetails = () => {

    const [laptop, setLaptop] = useState([])
    const [user, setUser] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams()


    const dispatch = useDispatch()

    //leptopBrand
    const { brand } = useSelector((state) => state.generalData)
    const leptopBrand = brand.filter((el) => el.id === laptop.brand_id)

    //employee team and position
    const { position, teams } = useSelector((state) => state.generalData)

    const employeePosition = position.filter(el => el.id === user.position_id)
    const employeeTeam = teams.filter(el => el.id === user.team_id)

    console.log(employeeTeam);

    const fetchLeptopDetails = () => {
        return axios({
            method: 'GET',
            url: baseUrl(`/api/laptop/${id}`),
            params: {
                token: "23bf880685353b8b80913bfa7e38c4bf",

            },
        }).then((res) => {
            const { laptop, user } = res.data.data
            setLaptop(laptop)
            console.log(laptop);
            setUser(user)
            setIsLoading(false)

        }).catch((err) => {
            console.log(err);
        })
    }




    useEffect(() => {
        fetchLeptopDetails()
        dispatch(fetchBrandsData())
        dispatch(fetchTeamsData())
        dispatch(fetchPositionData())
    }, [id])



    return (
        <div className='container h-100'>
            <PageHeader text="ლეპტოპის ინფო" />

            {!isLoading ? <div className='mt-5'>
                <div className='row justify-center-around '>
                    <div className='col-12 col-md-6 mb-3 detail-page-leptop-img-wrapper'>
                        <img src={baseUrl(laptop.image)} alt="" />
                    </div>
                    <div className='col-12 col-md-6 '>
                        <List title={userInfoTitle} info={[user.name, employeeTeam[0]?.name, employeePosition[0]?.name, user.email, user.phone_number]} />
                    </div>
                </div>
                <span className="line"></span>
                <div className='row justify-center-around'>
                    <div className='col-12 col-md-6'>
                        <List title={laptopBasicInfoTitle} info={[laptop.name,
                        leptopBrand[0].name,
                        laptop.ram, laptop.hard_drive_type]
                        } />
                    </div>
                    <div className='col-12 col-md-6'>
                        <List title={cpuInfoTitle} info={[laptop.cpu.name, laptop.cpu.cores, laptop.cpu.threads]} />
                    </div>
                </div>
                <span className="line"></span>
                <div className='row justify-center-around'>
                    <div className='col-12 col-md-6'>
                        <List title={otherInfoTitle} info={[laptop.state,
                        laptop.hard_drive_type, laptop.price]
                        } />
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className="row align-items-center p-3 h-100" >
                            <div className='col-6'>
                                <p className='fw-bold' style={{ color: "#2E2E2E" }}>შეძენის რიცხვი:</p>
                            </div>
                            <div className='col-6'>
                                <p style={{ color: '#797979' }} >{laptop.purchase_date}</p>

                            </div>
                        </div>
                    </div>
                </div>
            </div> : <h1>Loading....</h1>}
        </div>
    )
}

export default LeptopDetails