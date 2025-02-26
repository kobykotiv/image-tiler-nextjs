class RateLimiter {
  private requests: Map<string, number> = new Map();

  canMakeRequest(ip: string): boolean {
    const now = Date.now();
    const lastRequest = this.requests.get(ip) || 0;
    
    if (now - lastRequest >= 1000) {
      this.requests.set(ip, now);
      return true;
    }
    return false;
  }
}

export const rateLimiter = new RateLimiter();
