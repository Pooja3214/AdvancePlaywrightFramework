//CRUD operation
import { base } from '@faker-js/faker/.';
import {test,expect} from '@playwright/test';
import { logger } from '@utils/logger';
import { request } from 'node:http';

interface BookingDates{
    checkin: string;
    checkout:string;
}

interface BookingPayload{
    firstname : string;
    lastname : string;
    totalprice : number;
    depositpaid : boolean;
    bookingdates : BookingDates;
    additionalneeds: string;
}

interface AuthTokenResponse{
    token: string;
}

interface CreateBookingResponse{
    bookingid: number;
    booking: BookingPayload;
}

interface BookingFlowState{
    token?: string;
    bookingid?:number;
}

test.describe.serial('Restful Booker CRUD API', ()=>{

    const baseUrl= process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com';
    const headers= {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    };

    const bookingFlowState: BookingFlowState= {};
    const payload: BookingPayload = {
    "firstname" : "Pooja",
    "lastname" : "Sharma",
    "totalprice" : 111,
    "depositpaid" : true,
    "bookingdates" : {
        "checkin" : "2018-01-01",
        "checkout" : "2019-01-01"
    },
    "additionalneeds" : "Breakfast"

    };

 test('TC#1 @p0 - Create token', async ({ request }) => {
        await test.step('Create token', async () => {
            const responseData = await request.post(`${baseUrl}/auth`, {
                headers,
                data: {
                    username: 'admin',
                    password: 'password123',
                },
            });

            expect(responseData.status()).toBe(200);
            const data = await responseData.json() as AuthTokenResponse;
            expect(data.token).toBeTruthy();

            bookingFlowState.token = data.token;
            logger.info('Created auth token for CRUD flow');
        });


    });

    test('TC2# @p0 -Create booking', async({request})=>{
        await test.step('Create booking', async()=>{
            const responseData= await request.post(`${baseUrl}/booking`, {
                headers,
                data:payload,
            });

            expect(responseData.status()).toBe(200);
            const data= await responseData.json() as CreateBookingResponse;
            expect(data.bookingid).toBeTruthy();
            bookingFlowState.bookingid= data.bookingid;
            logger.info(`Created booking id for CRUD flow: ${bookingFlowState.bookingid}`);
        });
    });

    test('TC3# @p0- Update booking',async({request})=>{

        await test.step('Update booking', async()=>{

            const token= bookingFlowState.token;
            const bookingId= bookingFlowState.bookingid;
            if(!token || !bookingId){
                throw new Error('Create token and create booking tests must pass before update booking.');
            }

            const responseData= await request.put(`${baseUrl}/booking/${bookingId}`,{
                headers:{
                    ...headers,
                    Cookie: `token=${token}`
                },
                data: payload,
            });

            expect(responseData.status()).toBe(200);
            const data= await responseData.json() as BookingPayload;
            expect(data.firstname).toBeTruthy();
            expect(data.lastname).toBeTruthy();
            
            logger.info(`Update booking id ${bookingId}: ${data.firstname} ${data.lastname}`);

        })
    })

})