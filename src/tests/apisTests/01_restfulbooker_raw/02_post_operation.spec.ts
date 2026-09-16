import {expect, test} from '@playwright/test';
import { logger } from '@utils/logger';

test('TC1# @p0- POST- Verify that create booking is working fine.', async({request})=>{
const baseUrl= 'https://restful-booker.herokuapp.com';
const payload= {
    "firstname" : "Jim",
    "lastname" : "Brown",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"
};

const headers={
    'Content-Type': 'application/json',
    Accept: 'application/json'
};

const responseData= await request.post(`${baseUrl}/booking`, {
        headers,
        data:payload
});

        expect(responseData.status()).toBe(200);
        const data= await responseData.json();
        expect(data.bookingid).toBeTruthy();
        expect(data.booking.firstname).toBeTruthy();
        expect(data.booking.lastname).toBeTruthy();
        logger.info(`Created booking id: ${data.bookingid}`);


})
