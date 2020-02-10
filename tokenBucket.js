class TokenBucket{
    constructor(totalCapacity, refillPerSecond){
      this.totalCapacity = totalCapacity,
      this.refillPerSecond = refillPerSecond
      
      this.lastFilled = Math.floor(Date.now() / 1000);
      this.availTokens = totalCapacity
    }
  
    availableTokens(){
      return this.availTokens
    }
  
    replenishTokens(){
      const now = Math.floor(Date.now() / 1000);
      const rate = (now - this.lastFilled) / this.refillPerSecond;
  
      this.availTokens = Math.min(this.totalCapacity, this.availTokens + Math.floor(rate * this.totalCapacity));
      this.lastFilled = now;
    }
  
    deplete(){
      this.replenishTokens();
  
      if (this.availTokens > 0) {
        this.availTokens--;
        return true;
      }
  
      return false;
    }
}

module.exports = TokenBucket