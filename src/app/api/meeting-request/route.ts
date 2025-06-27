import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// 데이터 타입 정의
interface MeetingRequestData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  purpose: string;
  message?: string;
}

// Google Sheets API 설정
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SHEET_ID = process.env.GOOGLE_SHEET_ID; // 환경변수에서 가져올 예정
const RANGE = 'Sheet1!A:G'; // A열부터 G열까지 사용

// Google Sheets API 인증
async function getGoogleSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  });

  return google.sheets({ version: 'v4', auth });
}

// Google Sheets에 데이터 추가
async function addToGoogleSheets(data: MeetingRequestData) {
  try {
    const sheets = await getGoogleSheetsClient();
    
    const values = [
      [
        new Date().toISOString(), // 타임스탬프
        data.name,
        data.email,
        data.company || '',
        data.phone || '',
        data.purpose,
        data.message || ''
      ]
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: RANGE,
      valueInputOption: 'RAW',
      requestBody: {
        values: values,
      },
    });

    return true;
  } catch (error) {
    console.error('Google Sheets 에러:', error);
    return false;
  }
}

// 이메일 발송
async function sendEmail(data: MeetingRequestData) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Gmail 계정
        pass: process.env.EMAIL_APP_PASSWORD, // Gmail 앱 비밀번호
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'lia@hautrip.com',
      subject: `[PlaceList] 새로운 미팅 신청 - ${data.purpose}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">새로운 미팅 신청이 접수되었습니다</h2>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #007bff; margin-top: 0;">신청자 정보</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold; width: 120px;">이름:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">이메일:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${data.email}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">회사/조직:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${data.company || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">전화번호:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${data.phone || '-'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6; font-weight: bold;">미팅 목적:</td>
                <td style="padding: 8px 0; border-bottom: 1px solid #dee2e6;">${data.purpose}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold;">메시지:</td>
                <td style="padding: 8px 0;">${data.message || '-'}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #e7f3ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #0056b3;">
              <strong>신청 시간:</strong> ${new Date().toLocaleString('ko-KR')}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${data.email}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              신청자에게 답장하기
            </a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('이메일 발송 에러:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: MeetingRequestData = await request.json();
    
    // 필수 필드 검증
    if (!data.name || !data.email || !data.purpose) {
      return NextResponse.json(
        { error: '필수 필드가 누락되었습니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      );
    }

    // Google Sheets에 데이터 추가
    const sheetsSuccess = await addToGoogleSheets(data);
    
    // 이메일 발송
    const emailSuccess = await sendEmail(data);

    if (sheetsSuccess && emailSuccess) {
      return NextResponse.json(
        { message: '신청이 성공적으로 접수되었습니다.' },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { 
          message: '신청이 접수되었지만 일부 처리에 실패했습니다.',
          sheetsSuccess,
          emailSuccess
        },
        { status: 207 }
      );
    }

  } catch (error) {
    console.error('API 에러:', error);
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 