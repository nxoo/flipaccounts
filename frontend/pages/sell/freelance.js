import {useState} from 'react';
import Layout from '../../components/layout';


export default function addFreelance() {
    const [type, setType] = useState('');
    const [company, setComopany] = useState('');
    const [category, setCategory] = useState('');
    const [rating, setRating] = useState('');
    const [age, setAge] = useState('');
    const [gigs, setGigs] = useState(''); 
    const [earned, setEaerned] = useState('');
    const [price, setPrice] = useState('');
    const [hidePrice, setHidePrie] = useState('');
    const [offers, setOffers] = useState('');
    const [auction, setAuction] = useState('');
    const [auctionInc, setAuctionInc] = useState('');
    const [verificaton, setVerification] = useState('');
    const [verified, setVerified] = useState('');
    const [country, setCountry] = useState('');
    const [vpn, setVpn] = useState('');
    const [originalEmail, setOriginalEmail] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Layout>
            <div>
                <h4>Add a freelance account</h4>
            </div>
        </Layout>
    )
}
