/**
 * config.js - Environment Variable Loader for Vanilla JS Static Sites on Vercel
 * 
 * 1. Tries to fetch from Vercel Serverless Function (/api/config)
 * 2. Falls back to parsing local .env file for local development
 */

window.ENV = {};

async function loadEnv() {
    // 1. Try fetching from Vercel Serverless Function
    try {
        const apiResponse = await fetch('/api/config');
        if (apiResponse.ok) {
            const data = await apiResponse.json();
            window.ENV = data;
            console.log('Environment variables loaded from Vercel API.');
            return;
        }
    } catch (e) {
        // Silent catch; fallback to local file
    }

    // 2. Fallback to local .env file parsing
    try {
        const response = await fetch('.env');
        if (!response.ok) {
            console.warn('.env file not found. Using default/empty configuration.');
            return;
        }
        const text = await response.text();
        
        // Parse key-value pairs
        text.split(/\r?\n/).forEach(line => {
            const trimmedLine = line.trim();
            if (!trimmedLine || trimmedLine.startsWith('#')) return;
            
            const equalsIndex = trimmedLine.indexOf('=');
            if (equalsIndex === -1) return;
            
            const key = trimmedLine.slice(0, equalsIndex).trim();
            let value = trimmedLine.slice(equalsIndex + 1).trim();
            
            // Strip quotes
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
                value = value.slice(1, -1);
            }
            
            window.ENV[key] = value;
        });
        
        console.log('Environment variables loaded from local .env file.');
    } catch (error) {
        console.error('Error loading environment variables:', error);
    }
}

// Expose the load promise so script.js can await it
window.envPromise = loadEnv();
