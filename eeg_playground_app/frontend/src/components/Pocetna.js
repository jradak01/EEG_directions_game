import React from 'react';
import { Card, CardGroup, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import './stil.css';
import './grid.css';
const Pocetna = () => {
    const redirect = useNavigate();
    const goToPage = (page) => {
        redirect(`/${page}`)
        window.location.reload(false)
    }
    return (
        <div className='home'>
            <img className='backgorund-image' src="https://wallpapershome.com/images/wallpapers/abstract-3840x2160-colorful-ipad-pro-2018-4k-20825.jpg"></img>
            <CardGroup style={{width: '1200px', marginTop: '3%'}}>
                <Card style={{width: '400px', display: 'flex'}} className='text-center'>
                    <Card.Img variant="top" style={{width: '390px'}} src="https://kadence.com/wp-content/uploads/2022/04/As-introduction-to-Data-collection-in-marketing-research.jpg" />
                    <Card.Body>
                        <Card.Title>Collect Data</Card.Title>
                        <Card.Text>
                            Collect data to train your model.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{backgroundColor: 'white'}}>
                        <Button variant="dark" size='lg' onClick={()=>goToPage('collectdata')}>Collect</Button>
                    </Card.Footer>
                </Card>
                <Card style={{width: '400px'}} className='text-center'>
                    <Card.Img variant="top" style={{width: '390px'}} src="https://cdni.iconscout.com/illustration/premium/thumb/industrial-robot-4468717-3748899.png" />
                    <Card.Body>
                        <Card.Title>Train Model</Card.Title>
                        <Card.Text>
                            Train a machine learning model with which you will play games.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{backgroundColor: 'white'}}>
                        <Button variant="dark" size='lg' onClick={()=>goToPage('trainmodel')}>Train</Button>
                    </Card.Footer>
                </Card>
                <Card style={{width: '400px'}} className='text-center'>
                    <Card.Img variant="top" style={{width: '390px'}} src="https://media.istockphoto.com/vectors/family-play-games-vector-id977728274?k=20&m=977728274&s=612x612&w=0&h=heh3LNHu1DRT2o6byg0NcdU_gYhSiz-Nmj-0sPnA-4w=" />
                    <Card.Body>
                        <Card.Title>Play</Card.Title>
                        <Card.Text>
                            Try playing games using EEG.
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer style={{backgroundColor: 'white'}}>
                        <Button variant="dark" size='lg' onClick={()=>goToPage('game')}>Play</Button>
                    </Card.Footer>
                </Card>
            </CardGroup>
        </div>
    );
}

export default Pocetna;