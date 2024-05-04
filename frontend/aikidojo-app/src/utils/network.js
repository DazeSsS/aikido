import axios from 'axios';

export const getApiResource = async (url) => {
    try {
        const res = await axios.get(url);
        
        if (!res.status === 200) {
            console.error('Could not fetch.', res.status);
            return false;
        }

        return res.data;
    } catch (error) {
        console.error('Could not fetch.', error.message);
        return false;
    }  
}

