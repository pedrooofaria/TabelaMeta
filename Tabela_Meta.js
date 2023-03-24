/*globals define*/
define( ["qlik", "jquery", "text!./style.css"], function ( qlik, $, cssContent ) {
	'use strict';
	$( "<style>" ).html( cssContent ).appendTo( "head" );
	
	//Período 01 a 04; Faseamento 10%;
	//Período 06 a 11; Faseamento 35%;
	//Período 13 a 18; Faseamento 60%;
	//Período 20 a 25; Faseamento 85%;
	//Período 27 a 31; Faseamento 100%
	
	const fase = 85;
	
	function createRows ( rows, dimensionInfo, qtdRow ) {
		var html = "",
			controw = 1;
		

		rows.forEach( function ( row ) {
			html += '<tr>';
			row.forEach( function ( cell, key ) {
				if ( cell.qIsOtherCell ) {
					cell.qText = dimensionInfo[key].othersLabel;
				}
				
				html += "<td ";
				if ( key !== 0 ) {
					if(controw < (qtdRow-2)){
						if( controw % 2 !== 0 ) {
							html += "class='numeric-branco'";
						} else {
							html += "class='numeric-azul'";
						}
					} else {
						html += "class='numeric-totais2'";
					}
				} else {
					if(controw < (qtdRow-2)){
						if( controw % 2 !== 0 ) {
							html += "class='string-branco' style='padding: 3px 6px 3px 6px;border-left: 2px solid black;border-right: 2px solid black;color:black;'";
						} else {
							html += "class='string-azul'";
						}
					} else {
						html += "class='numeric-totais1'";
					}
				}
				if (key==0) {
						html += " style='border-left: 2px solid black;border-right: 2px solid black;'";
					} else if((key==5)||(key==10)||(key==15)){
						html += " style='border-right: 2px solid black;'";
				}
				if ((key==3)||(key==8)||(key==13)) {
					if( parseFloat(cell.qText) < fase ) {
						html += " style='color: red;'";
					} else {
						html += " style='color: green;'";
					}
				}
				if ((key==2)||(key==7)||(key==12)) {
					html += " style='color: #4472C4;'";
				}
				html += '>' + cell.qText + '</td>';
			} );
			controw = controw+1;
			html += '</tr>';

		} );
		return html;
		
	}
	
	function createRows2 ( rows, dimensionInfo, qtdRow ) {
		var html = "",
			controw = 1;
		
		rows.forEach( function ( row ) {
			html += '<tr>';
			row.forEach( function ( cell, key ) {
				if ( cell.qIsOtherCell ) {
					cell.qText = dimensionInfo[key].othersLabel;
				}
				
				if ( key !== 0 ) {
					if(controw < (qtdRow-2)){
						//---
					} else {
						html += '<td class="numeric-totais2">' + cell.qText + '</td>';
					}
				} else {
					if(controw < (qtdRow-2)){
						//---
					} else {
						html += '<td class="numeric-totais1">' + cell.qText + '</td>';
					}
				}
			} );
			controw = controw+1;
			html += '</tr>';

		} );
		return html;
		
	}

	return {
		initialProperties: {
			qHyperCubeDef: {
				qDimensions: [],
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 18,
					qHeight: 90
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				dimensions: {
					uses: "dimensions",
					min: 0,
					max: 30
				},
				measures: {
					uses: "measures",
					min: 0,
					max: 30
				},
				sorting: {
					uses: "sorting"
				},
				settings: {
					uses: "settings",
					items: {
						MyIntProp: {
							type: "number",
							label: "Faseamento",
							ref: "myproperties.fase",
							defaultValue: "0.0"
						}
					}
				}
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},
		paint: function ( $element, layout ) {
			var html = "<table><thead><tr>", self = this,
				morebutton = false,
				hypercube = layout.qHyperCube,
				rowcount = hypercube.qDataPages[0].qMatrix.length,
				colcount = hypercube.qDimensionInfo.length + hypercube.qMeasureInfo.length,
				contcol = 1,
				ger1 = 0,
				ger2 = 0,
				ger3 = 0;
			
			hypercube.qGrandTotalRow.forEach( function ( cell ) {
				if(contcol==3){
					ger1 = cell.qText;
				} else
				if(contcol == 8){
					ger2 = cell.qText;
				} else {
				if(contcol == 13){
					ger3 = cell.qText;
					}
				}
				contcol=contcol+1;	
			} );
			
			
			
			
			//render CABEÇALHO 1
			contcol = 1;
			hypercube.qDimensionInfo.forEach( function ( cell ) {
				html += '<th class="fks2"><img style="width: 241.7px; height: 79.3px" src="https://i.postimg.cc/Y0LGqVd2/Icones-Filiais-01.png" alt="logo"><h3>META X REALIZADO</h3></th>';
				//html += '<th class="fks2"><h3>META X REALIZADO</h3></th>';
			} );
			

			
			

			hypercube.qMeasureInfo.forEach( function ( cell ) {
				switch (contcol) {
				  case 1:
					html += '<th colspan="5" class="titulo1"><table><tr><th><h1>'+ ger1 +'</h1></th><th style="width: 100px"><img style=" width: 66px;height: 84px" src="https://i.postimg.cc/bDnysCxS/PAULO-REGES.png" border="0" alt="PAULO-REGES"/></th></tr></table></th>';
					//html += '<th colspan="5" class="titulo1"><h1>'+ ger1 +'</h1></th>';
					contcol=contcol+1;
					break;
				  case 2:
				  	contcol=contcol+1;
					break;
				  case 3:
					contcol=contcol+1;
					break;
				  case 4:
					contcol=contcol+1;
					break;
				  case 5:
				  	contcol=contcol+1;
					break;
				  case 6:
					contcol=contcol+1;
					break;
				  case 7:
				  	html += '<th colspan="5" class="titulo1"><table><tr><th><h1>'+ ger2 +'</h1></th><th style="width: 100px"><img style=" width: 58px;height: 79px" src="https://i.postimg.cc/tYC1DYC8/EDUARDO-GAMEIRO.png" border="0" alt="EDUARDO-GAMEIRO"/></th></tr></table></th>';
					//html += '<th colspan="5" class="titulo1"><h1>'+ ger2 +'</h1></th>';
					contcol=contcol+1;
					break;
				  case 8:
				  	contcol=contcol+1;
					break;
				  case 9:
					contcol=contcol+1;
					break;
				  case 10:
					contcol=contcol+1;
					break;
				  case 11:
					contcol=contcol+1;
					break;
				  case 12:
					html += '<th colspan="5" class="titulo1"><table><tr><th><h1>'+ ger3 +'</h1></th><th style="width: 100px"><img style=" width: 58px;height: 79px" src="https://i.postimg.cc/kDh0kFKk/CARLOS-ETERNO.png" border="0" alt="CARLOS-ETERNO"/></th></tr></table></th>';
					//html += '<th colspan="5" class="titulo1"><h1>'+ ger3 +'</h1></th>';
					contcol=contcol+1;
					break;
				  case 13:
					contcol=contcol+1;
					break;
				  case 14:
					contcol=contcol+1;
					break;
				  case 15:
					contcol=contcol+1;
					break;
				}
			} );
			html += "</tr>";
			
			//render CABEÇALHO 2
			contcol = 1;
			html += "<tr>";
			hypercube.qDimensionInfo.forEach( function ( cell ) {
				html += '<th class="fks2"><h3>'+ layout.title +'</h3></th>';
			} );
			hypercube.qMeasureInfo.forEach( function ( cell ) {
				switch (contcol) {
				  case 1:
					html += '<th colspan="5" class="titulo2"><h3>PABLO REGES</h3></th>';
					contcol=contcol+1;
					break;
				  case 2:
				  	contcol=contcol+1;
					break;
				  case 3:
					contcol=contcol+1;
					break;
				  case 4:
					contcol=contcol+1;
					break;
				  case 5:
				  	contcol=contcol+1;
					break;
				  case 6:
					contcol=contcol+1;
					break;
				  case 7:
					html += '<th colspan="5" class="titulo2"><h3>EDUARDO GAMEIRO</h3></th>';
					contcol=contcol+1;
					break;
				  case 8:
				  	contcol=contcol+1;
					break;
				  case 9:
					contcol=contcol+1;
					break;
				  case 10:
					contcol=contcol+1;
					break;
				  case 11:
					contcol=contcol+1;
					break;
				  case 12:
					html += '<th colspan="5" class="titulo2"><h3>CARLOS ETERNO</h3></th>';
					contcol=contcol+1;
					break;
				  case 13:
					contcol=contcol+1;
					break;
				  case 14:
					contcol=contcol+1;
					break;
				  case 15:
					contcol=contcol+1;
					break;
				}
			} );
			html += "</tr>";
			
			//render CABEÇALHO 3
			contcol = 1;
			html += "<tr>";
			hypercube.qDimensionInfo.forEach( function ( cell ) {
				html += '<th class="dep" style="border-top: 2px solid black;"><h2>PEDIDO</h2></th>';
			} );
			hypercube.qMeasureInfo.forEach( function ( cell ) {
				switch (contcol) {
				  case 1:
					html += '<th colspan="5" class="titulo3"><h4>GERENTE DE VENDAS GRANDE GOIÂNIA</h4></th>';
					contcol=contcol+1;
					break;
				  case 2:
				  	contcol=contcol+1;
					break;
				  case 3:
					contcol=contcol+1;
					break;
				  case 4:
					contcol=contcol+1;
					break;
				  case 5:
				  	contcol=contcol+1;
					break;
				  case 6:
					contcol=contcol+1;
					break;
				  case 7:
					html += '<th colspan="5" class="titulo3"><h4>GERENTE DE VENDAS INTERIOR</h4></th>';
					contcol=contcol+1;
					break;
				  case 8:
				  	contcol=contcol+1;
					break;
				  case 9:
					contcol=contcol+1;
					break;
				  case 10:
					contcol=contcol+1;
					break;
				  case 11:
					contcol=contcol+1;
					break;
				  case 12:
					html += '<th colspan="5" class="titulo3"><h4>DIRETOR COMERCIAL FOKUS GOIÁS</h4></th>';
					contcol=contcol+1;
					break;
				  case 13:
					contcol=contcol+1;
					break;
				  case 14:
					contcol=contcol+1;
					break;
				  case 15:
					contcol=contcol+1;
					break;
				}
			} );
			html += "</tr>";
			
			//render CABEÇALHO 4
			var aux = 1;
			html += "<tr>";
			hypercube.qDimensionInfo.forEach( function ( cell ) {
				html += '<th class="dep" style="border-left: 2px solid black; border-right: 2px solid black; border-bottom: 2px solid black;"></th>';
			} );
			hypercube.qMeasureInfo.forEach( function ( cell ) {
				if(aux==5 || aux==10 || aux==15){
					html += '<th class="titulo4" style="border-right: 2px solid black;">' + cell.qFallbackTitle + '</th>';
				}else{
					html += '<th class="titulo4">' + cell.qFallbackTitle + '</th>';
				}
				aux++;
			} );
			
			
			html += "</tr></thead><tbody>";
			
			var qtdRow = hypercube.qSize.qcy;
			//render data
			html += createRows( hypercube.qDataPages[0].qMatrix, hypercube.qDimensionInfo, qtdRow );
			
			//render TOTAL
			html += "<tr>";
			html += '<th style="color: #FFFFFF;background-color: #002060;font-weight: bold;padding: 3px 6px 3px 6px;text-align: left;border: 2px solid black;"> GERAL </th>';
			contcol = 1;
			hypercube.qGrandTotalRow.forEach( function ( cell ) {
				html += '<th ';
				if ((contcol!=3)&&(contcol!=8)&&(contcol!=13)) {
					html += 'style="color: #FFFFFF;background-color: #002060;font-weight: bold;padding: 3px 6px 3px 6px;text-align: center;border: 2px solid black;';
					}else{
						html += 'style="background-color: #FFFF00;font-weight: bold;padding: 3px 6px 3px 6px;text-align: center;border: 2px solid black;';
						if( parseFloat(cell.qText) < fase ) {
							html += 'color: red;';
						} else {
							html += 'color: green;';
						}
					}
				html += '">' + cell.qText + '</th>';
				contcol=contcol+1;
			} );
			html += "</tr></tbody></table>";
			
			
			
			//add 'more...' button
			if ( hypercube.qSize.qcy > rowcount ) {
				html += "<button class='more'>More...</button>";
				morebutton = true;
			}
			$element.html( html );
			if ( morebutton ) {
				$element.find( ".more" ).on( "click", function () {
					var requestPage = [{
						qTop: rowcount,
						qLeft: 0,
						qWidth: colcount,
						qHeight: Math.min( 50, hypercube.qSize.qcy - rowcount )
					}];
					self.backendApi.getData( requestPage ).then( function ( dataPages ) {
						rowcount += dataPages[0].qMatrix.length;
						if ( rowcount >= hypercube.qSize.qcy ) {
							$element.find( ".more" ).hide();
						}
						var html = createRows( dataPages[0].qMatrix, hypercube.qDimensionInfo );
						$element.find( "tbody" ).append( html );
					} );
				} );
			}
				
			
			console.log(layout);
			return qlik.Promise.resolve();
		}
	};
} );
