
	function DistribucionNormal ( m , d) {
		this.media = m;
		this.desvio  = d;
		this.cons = 1 / ( this.desvio  * Math.sqrt(  2 * Math.PI) );
		
	}
	
	DistribucionNormal.prototype.f = function(v){
		var interior = ( (v - this.media  ) / this.desvio  ) ;
		return  this.cons * Math.exp( (-1/2) * interior * interior ) ;
	} 
	
	DistribucionNormal.prototype.getNumber = function () {
		var x,y,fx;
		do {
			x = getRandomReal ( this.media - this.desvio * 5   , this.media + this.desvio * 5   ) ;
			y = getRandomReal (0,1);
			fx = this.f(x);
		} while ( fx > y );
		return x;
	}
	
	DistribucionNormal.prototype.getNumberAB = function (A,B) {
		var x,y,fx;
		do {
			x = getRandomReal ( A  , B   ) ;
			y = getRandomReal (0,1);
			fx = this.f(x);
		} while ( fx > y );
		return x;
	}
	
	var tt = new DistribucionNormal(0,0.44);
	var t = createMemberInNormalDistribution(100,30)  ;
	function createMemberInNormalDistribution(mean,std_dev){
		return mean + (gaussRandom()*std_dev);
	}
	function gaussRandom() {
		var u = 2*Math.random()-1;
		var v = 2*Math.random()-1;
		var r = u*u + v*v;
		/*if outside interval [0,1] start over*/
		if(r == 0 || r > 1) return gaussRandom();

		var c = Math.sqrt(-2*Math.log(r)/r);
		return u*c;
	}
