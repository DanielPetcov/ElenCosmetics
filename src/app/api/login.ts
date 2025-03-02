import { NextApiRequest, NextApiResponse } from "next";
import payload from "@/queries";
export default async function POST(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== 'POST') {
        return res.status(405).json({message: 'Method not allowed'})
    }

    const {email, password} = req.body;

    try{
        const result = await payload.login({
            collection: 'users', 
            data: {
                email: email,
                password: password,
            },
            depth: 2,
            overrideAccess: false,
            showHiddenFields: true,
        });

        // res.setHeader('Set-Cookie', `payload-token=${result.token}; HttpOnly; Path=/; SameSite=Strict`);
        return res.status(200).json({ success: true, token: result.token });
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
}