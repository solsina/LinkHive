import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@linkhive/database';

export async function GET(request: NextRequest) {
  try {
    const startTime = Date.now();
    
    // Check database connection
    let dbStatus = 'healthy';
    let dbResponseTime = 0;
    
    try {
      const dbStartTime = Date.now();
      const { data, error } = await supabaseAdmin
        .from('users')
        .select('count')
        .limit(1);
      
      dbResponseTime = Date.now() - dbStartTime;
      
      if (error) {
        dbStatus = 'error';
        console.error('Database health check failed:', error);
      }
    } catch (error) {
      dbStatus = 'error';
      console.error('Database connection failed:', error);
    }

    // Check environment variables
    const envStatus = {
      clerk: !!process.env.CLERK_SECRET_KEY,
      supabase: !!process.env.SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      stripe: !!process.env.STRIPE_SECRET_KEY,
      resend: !!process.env.RESEND_API_KEY,
      googleAnalytics: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
      microsoftClarity: !!process.env.NEXT_PUBLIC_MICROSOFT_CLARITY_ID,
    };

    const overallStatus = dbStatus === 'healthy' && Object.values(envStatus).every(Boolean) 
      ? 'healthy' 
      : 'degraded';

    const responseTime = Date.now() - startTime;

    const healthData = {
      status: overallStatus,
      timestamp: new Date().toISOString(),
      version: process.env.VERCEL_GIT_COMMIT_SHA || 'development',
      environment: process.env.NODE_ENV,
      responseTime: `${responseTime}ms`,
      services: {
        database: {
          status: dbStatus,
          responseTime: `${dbResponseTime}ms`,
        },
        environment: {
          status: Object.values(envStatus).every(Boolean) ? 'healthy' : 'degraded',
          variables: envStatus,
        },
      },
      uptime: process.uptime(),
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
        total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      },
    };

    const statusCode = overallStatus === 'healthy' ? 200 : 503;

    return NextResponse.json(healthData, { status: statusCode });
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    }, { status: 500 });
  }
}
