import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(__dirname, process.env.TEST_ENV ? `.env.${process.env.TEST_ENV}` : '.env') });


export default defineConfig({
  globalTimeout: 60000,
  testDir: './tests',
  fullyParallel: true, 
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1 ,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: process.env.URL,
    trace: 'on-first-retry',
    video: 'off',

  },
  projects: [
    {
       name: 'mobile-test',
       use: {
         ...devices['iPhone 17 Pro Max']
       }
    },
    {
      name: 'chromium',
      timeout:20000,
      retries:3,
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  
});
