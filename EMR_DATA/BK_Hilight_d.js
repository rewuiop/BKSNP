function FORMAT_INFO()
{
	this.r_type="";
	this.r_start=0;
	this.r_length=0;
	this.r_str="";
}

function BK_FORMAT_TEXT(r_textData)
{
	this.r_format = new Array();
	this.r_text;
	this.r_dpi;
	this.r_zoom;
	this.r_length;
	this.r_ratio;
	this.r_size;	// 추가 2015-03-03
	this.r_color; // 추가 2015-03-03
	this.r_font;  // 추가 2015-03-03
	
	this.r_Draw = function(r_ctx, r_left, r_top)
	{
		var pos = 0;
		var top1 = r_top;
		var len = this.r_text.length;
		while(pos<len)
		{
			var start;
			var end;
			var ret = 1;
			var posArr = null;
			while(ret)
			{
				posArr = this.r_GetNextLine(pos, start, end);
				if(posArr==null)
					ret = 0;
				else
				{
					start = posArr[0];
					end = posArr[1];
					break;
				}
			}
			this.r_zoom = 1; //2014-11-03
			pos += (end-start+1);
			var left1 = r_left;
			var maxFontSize = this.r_GetMaxFontSize(start, end);
			
			if(maxFontSize == 0)
				maxFontSize = (this.r_size*this.r_dpi/100)*this.r_zoom*this.r_ratio*1.25;
				//masFontSize = (this.r_size*this.r_dpi/100)*this.r_zoom*this.r_ratio;
			else
				maxFontSize = (maxFontSize*this.r_dpi/100)*this.r_zoom*this.r_ratio*0.95;
				
			while(start<end)
			{

				var nPos = this.r_GetFormatBlock(start+1, end);
				left1 += this.r_DrawString(r_ctx, start, nPos, left1, top1, maxFontSize);
				start = nPos;
			}
			top1 += maxFontSize;
		}
	};
	
	this.r_GetMaxFontSize = function(start, end)
	{
		var maxSize = 0;
		var len = this.r_format.length;
		for(var i=0; i<len; i++)
		{
			if(this.r_format[i].r_type != 's')
				continue;
			var size = parseInt(this.r_format[i].str);
			if(this.r_format[i].r_start >= start && this.r_format[i].r_start <= end)
			{
				if(size > maxSize)
					maxSize = size;
			}
			else if((this.r_format[i].r_start + this.r_format[i].r_lenght-1)>=start &&(this.r_format[i].r_start+this.r_format[i].r_length-1)<=end)
			{
				if(size > maxSize)
					maxSize = size;
			}
			
			if(this.r_format[i].start > end )
				break;
			
		}
		return maxSize;
	};
	
	this.r_GetFormatBlock = function(start, end, type)
	{
		var pos = end;
		var len = this.r_format.length;
		for(var i=0; i<len; i++)
		{
			if((this.r_format[i].r_start + this.r_format[i].r_length) < start)
				continue;
			if(type >= 0 && type != this.r_format[i].r_type)
				continue;
			if(this.r_format[i].r_start >= start && this.r_format[i].r_start <= end)
			{
				if(this.r_format[i].r_start<pos)
					pos = this.r_format[i].r_start;
			}
			else if((this.r_format[i].r_start+this.r_format[i].r_length) >= start && (this.r_format[i].r_start+this.r_format[i].r_length) <= end)
			{
				if((this.r_format[i].r_start + this.r_format[i].r_length)<pos)
					pos = (this.r_format[i].r_start + this.r_format[i].r_length);
			}
			
			if(this.r_format[i].r_start > end)
				break;
		}
		return pos;
	};
	
	this.r_GetNextLine = function(pos, start, end)
	{
		if(pos >= this.r_length)
			return null;
		start = pos;
		
		while(pos<this.r_length)
		{
			if(this.r_text.substring(pos, pos+1)=="\n")
			{
				end = pos;
				return [start, end];
			}
			pos++;
		}
		end = pos;
		return [start, end];
	};
	
	this.r_DrawString = function(r_ctx, r_start, r_end, r_left, r_top, maxFontSize)
	{
		var len = r_end - r_start;
		var tFormat = this.r_GetFormat('c', r_start);
		if(tFormat)
			r_ctx.fillStyle = tFormat.r_str;
		else
			r_ctx.fillStyle = this.r_color;
			//r_ctx.fillStyle = "#000000";
				
		var fWeight = 0;
		var font = "";
		tFormat = this.r_GetFormat('s', r_start);
		//var size = (20*this.r_dpi/100)*this.r_zoom;
		var size = (this.r_size*this.r_dpi/65)*this.r_zoom;
		
		if(tFormat)
			size = (parseInt(tFormat.r_str) * this.r_dpi/100)*this.r_zoom;
			
		font = (size/this.r_dpi*this.r_ratio*0.95)+"in";
		
		tFormat = this.r_GetFormat('b', r_start);
		if(tFormat)
			font = "bold "+font;
		else
			font = "normal "+font;
		
		tFormat = this.r_GetFormat('f', r_start);
		if(tFormat)
			font += " "+tFormat.r_str;
		else
			font += " "+this.r_font;
			//font += " 굴림";
			
		r_ctx.font = font;
		r_top += (maxFontSize-size);
		r_top += size;
		var r_width =0;
		
		r_ctx.fillText(this.r_text.substring(r_start,r_end), r_left +r_width, r_top);
		
		// 캔버스에 글자 그리기
		r_width = r_ctx.measureText(this.r_text.substring(r_start, r_end)); //글자그린 넓이
		return r_width.width;
		
	};
	
	this.r_GetFormat = function(r_type, r_pos)
	{
		var retVal = null;
		for(var i=0; i<this.r_format.length; i++)
		{
			if(this.r_format[i].r_type != r_type)
				continue;
			if(this.r_format[i].r_start <= r_pos && (this.r_format[i].r_start+this.r_format[i].r_length-1 >= r_pos))
				retVal = this.r_format[i];
			if(this.r_format[i].r_start > r_pos)
				break;
		}
		return retVal;
	};
	
	this.r_SetFormatString = function(r_data)
	{
		var x = r_data;
		x=x.split('{');
		var len=x.length;
		var x3=new Array();
		var x3_l=0;
		
		var oStr=x[0];
		var fD=new Array();
		var fD_l=0;
		
		for(var n=1;n<len;n++)
		{
			var x2=x[n].split('}');
			for(var m=0;m<x2.length;m++)
			{
				var x3= x2[m].split(",");
				if(x3.length >=3)
				{
					var len2=x3.length;
					for(var i=2;i<len2;i++)
						x3[1]+= ","+x3[i];
				}
				
				if(m==0)
				{
					if(x3[0]==' ')
					{
						oStr += '{';
					}
					else
					{
						fD[fD_l++]=[x3[0].substring(0,1), x3[0].substring(1), oStr.length];
					}
				}
				else
				{
					if(x3[0]==' ')
					{
						oStr += '}';
					}
					else
					{
						for(var k=fD_l;k>0;k--)
						{
							if(fD[k-1][0]==x3[0])
							{
								fD[k-1][3]=oStr.length;
								break;
							}
						}
					}
				}
				
				oStr += x3[1];
			}
		}
		len = fD.length;
		for(var i=0; i<len; i++)
		{
			this.r_format[i] = new FORMAT_INFO();
			this.r_format[i].r_type = fD[i][0];
			this.r_format[i].r_str = fD[i][1];
			this.r_format[i].r_start = fD[i][2];
			this.r_format[i].r_length = parseInt(fD[i][3]) - parseInt(fD[i][2]);
		}
		this.r_text = oStr;
		this.r_length = this.r_text.length;
	};
	
	this.r_GetFormatData = function()
	{
	};
	
	this.r_SetFormat = function(type, data, start, end)
	{
		if(start<0)
		{
			start = m_selStart;
			end = m_selEnd;
		}
		
		if(start == end)
			MoveFormatPos(start, 0);
			
		var len = this.r_format.length;
		for(var i=0; i<len; i++)
		{
			if(this.r_format[i] == null) break;
			if(this.r_format[i].r_type != type) continue;
			if(this.r_format[i].r_start + this.r_format[i].r_length < start) continue;
			if(this.r_format[i].r_start > end) continue;
			if(this.r_format[i].r_start >= start && (this.r_format[i].r_start + this.r_format[i].r_length) <= end)
			{
				DeleteFormat(i);
				i--;
				continue;
			}
			
			if(this.r_format[i].r_start && this.r_format[i].r_start < end)
				this.r_format[i].r_start = end;
				
			if((this.r_format[i].r_start + this.r_format[i].r_length)>start && (this.r_format[i].r_start + this.r_format[i].r_length)<=end)
				this.r_format[i].r_length = start - this.r_format[i].r_start;
		}
		
		AddFormat(type, start, end);
	};
	
	this.r_AddFormat = function(type, data, start, end)
	{
		var idx = 0;
		var len = this.r_format.length;
		for(var i=0; i<len; i++)
		{
			if(this.r_format[i] == null)
			{
				idx = i;
				break;
			}
			if(this.r_format[i].r_start > start)
			{
				idx = i;
				var pTemp1 = new FORMAT_INFO();
				var pTemp2 = null;
				while(i<MAX_FORMAT-1)
				{
					pTemp2 = this.r_format[i+1];
					this.r_format[i+1]= pTemp1;
					pTemp1 = pTemp2;
					if(pTemp1 == null)
						break;
					i++;
				}
				break;
			}
		}
		this.r_format[idx] = new FORMAT_INFO();
		this.r_format[idx].r_start = start;
		this.r_format[idx].r_length = end - start;
		this.r_format[idx].r_type = type;
		this.r_format[idx].r_str = data;
		
	};
	this.r_SetFormatString(r_textData);
}


function SetFormat(mode, data)
{
	var sel = window.getSelection();
	
}