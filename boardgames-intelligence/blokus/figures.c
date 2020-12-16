#include "types_constants.h"
#include <string.h>
#include <stdio.h>

void init_fig(struct tfig *fig)
{
	memset(fig, 0, sizeof fig[0] * FIGAMOUNT);

	// 0. Cтаршая палка
	fig[0].n = 5;
	fig[0].s = 2;

	fig[0].sim[0].cells[0].i = 0; fig[0].sim[0].cells[0].j = 0; //#
	fig[0].sim[0].cells[1].i = 1; fig[0].sim[0].cells[1].j = 0; //#
	fig[0].sim[0].cells[2].i = 2; fig[0].sim[0].cells[2].j = 0; //#
	fig[0].sim[0].cells[3].i = 3; fig[0].sim[0].cells[3].j = 0; //#
	fig[0].sim[0].cells[4].i = 4; fig[0].sim[0].cells[4].j = 0; //#

	fig[0].sim[1].cells[0].i = 0; fig[0].sim[1].cells[0].j = 0; //# # # # #
	fig[0].sim[1].cells[1].i = 0; fig[0].sim[1].cells[1].j = 1;
	fig[0].sim[1].cells[2].i = 0; fig[0].sim[1].cells[2].j = 2;
	fig[0].sim[1].cells[3].i = 0; fig[0].sim[1].cells[3].j = 3;
	fig[0].sim[1].cells[4].i = 0; fig[0].sim[1].cells[4].j = 4;

	//1.  Клюшка
	fig[1].n = 5;
	fig[1].s = 8;

	fig[1].sim[0].cells[0].i = 0; fig[1].sim[0].cells[0].j = 0; //# #
	fig[1].sim[0].cells[1].i = 0; fig[1].sim[0].cells[1].j = 1; //  #
	fig[1].sim[0].cells[2].i = 1; fig[1].sim[0].cells[2].j = 1; //  #
	fig[1].sim[0].cells[3].i = 2; fig[1].sim[0].cells[3].j = 1; //  #
	fig[1].sim[0].cells[4].i = 3; fig[1].sim[0].cells[4].j = 1;

	fig[1].sim[1].cells[0].i = 0; fig[1].sim[1].cells[0].j = 0; //# #
	fig[1].sim[1].cells[1].i = 0; fig[1].sim[1].cells[1].j = 1; //#
	fig[1].sim[1].cells[2].i = 1; fig[1].sim[1].cells[2].j = 0; //#
	fig[1].sim[1].cells[3].i = 2; fig[1].sim[1].cells[3].j = 0; //#
	fig[1].sim[1].cells[4].i = 3; fig[1].sim[1].cells[4].j = 0;

	fig[1].sim[2].cells[0].i = 0; fig[1].sim[2].cells[0].j = 0; //# 
	fig[1].sim[2].cells[1].i = 1; fig[1].sim[2].cells[1].j = 0; //#
	fig[1].sim[2].cells[2].i = 2; fig[1].sim[2].cells[2].j = 0; //#
	fig[1].sim[2].cells[3].i = 3; fig[1].sim[2].cells[3].j = 0; //# #
	fig[1].sim[2].cells[4].i = 3; fig[1].sim[2].cells[4].j = 1;

	fig[1].sim[3].cells[0].i = 0; fig[1].sim[3].cells[0].j = 1; //  # 
	fig[1].sim[3].cells[1].i = 1; fig[1].sim[3].cells[1].j = 1; //  #
	fig[1].sim[3].cells[2].i = 2; fig[1].sim[3].cells[2].j = 1; //  #
	fig[1].sim[3].cells[3].i = 3; fig[1].sim[3].cells[3].j = 0; //# #
	fig[1].sim[3].cells[4].i = 3; fig[1].sim[3].cells[4].j = 1;

	fig[1].sim[4].cells[0].i = 0; fig[1].sim[4].cells[0].j = 0; //# # # # 
	fig[1].sim[4].cells[1].i = 0; fig[1].sim[4].cells[1].j = 1; //#
	fig[1].sim[4].cells[2].i = 0; fig[1].sim[4].cells[2].j = 2;
	fig[1].sim[4].cells[3].i = 0; fig[1].sim[4].cells[3].j = 3;
	fig[1].sim[4].cells[4].i = 1; fig[1].sim[4].cells[4].j = 0;

	fig[1].sim[5].cells[0].i = 0; fig[1].sim[5].cells[0].j = 0; //#  
	fig[1].sim[5].cells[1].i = 1; fig[1].sim[5].cells[1].j = 0; //# # # #
	fig[1].sim[5].cells[2].i = 1; fig[1].sim[5].cells[2].j = 1;
	fig[1].sim[5].cells[3].i = 1; fig[1].sim[5].cells[3].j = 2;
	fig[1].sim[5].cells[4].i = 1; fig[1].sim[5].cells[4].j = 3;

	fig[1].sim[6].cells[0].i = 0; fig[1].sim[6].cells[0].j = 3; //		#
	fig[1].sim[6].cells[1].i = 1; fig[1].sim[6].cells[1].j = 0; //# # # #
	fig[1].sim[6].cells[2].i = 1; fig[1].sim[6].cells[2].j = 1;
	fig[1].sim[6].cells[3].i = 1; fig[1].sim[6].cells[3].j = 2;
	fig[1].sim[6].cells[4].i = 1; fig[1].sim[6].cells[4].j = 3;

	fig[1].sim[7].cells[0].i = 0; fig[1].sim[7].cells[0].j = 0; //# # # # 
	fig[1].sim[7].cells[1].i = 0; fig[1].sim[7].cells[1].j = 1; //      #
	fig[1].sim[7].cells[2].i = 0; fig[1].sim[7].cells[2].j = 2;
	fig[1].sim[7].cells[3].i = 0; fig[1].sim[7].cells[3].j = 3;
	fig[1].sim[7].cells[4].i = 1; fig[1].sim[7].cells[4].j = 3;

	//2. Автомат

	fig[2].n = 5;
	fig[2].s = 8;

	fig[2].sim[0].cells[0].i = 0; fig[2].sim[0].cells[0].j = 1; //  #
	fig[2].sim[0].cells[1].i = 1; fig[2].sim[0].cells[1].j = 0; //# #
	fig[2].sim[0].cells[2].i = 1; fig[2].sim[0].cells[2].j = 1; //  #
	fig[2].sim[0].cells[3].i = 2; fig[2].sim[0].cells[3].j = 1; //  #
	fig[2].sim[0].cells[4].i = 3; fig[2].sim[0].cells[4].j = 1;

	fig[2].sim[1].cells[0].i = 0; fig[2].sim[1].cells[0].j = 0; //# 
	fig[2].sim[1].cells[1].i = 1; fig[2].sim[1].cells[1].j = 0; //# #
	fig[2].sim[1].cells[2].i = 1; fig[2].sim[1].cells[2].j = 1; //#
	fig[2].sim[1].cells[3].i = 2; fig[2].sim[1].cells[3].j = 0; //#
	fig[2].sim[1].cells[4].i = 3; fig[2].sim[1].cells[4].j = 0;

	fig[2].sim[2].cells[0].i = 0; fig[2].sim[2].cells[0].j = 0; //# 
	fig[2].sim[2].cells[1].i = 1; fig[2].sim[2].cells[1].j = 0; //#
	fig[2].sim[2].cells[2].i = 2; fig[2].sim[2].cells[2].j = 0; //# #
	fig[2].sim[2].cells[3].i = 2; fig[2].sim[2].cells[3].j = 1; //# 
	fig[2].sim[2].cells[4].i = 3; fig[2].sim[2].cells[4].j = 0;

	fig[2].sim[3].cells[0].i = 0; fig[2].sim[3].cells[0].j = 1; //  # 
	fig[2].sim[3].cells[1].i = 1; fig[2].sim[3].cells[1].j = 1; //  #
	fig[2].sim[3].cells[2].i = 2; fig[2].sim[3].cells[2].j = 0; //# #
	fig[2].sim[3].cells[3].i = 2; fig[2].sim[3].cells[3].j = 1; //  #
	fig[2].sim[3].cells[4].i = 3; fig[2].sim[3].cells[4].j = 1;

	fig[2].sim[4].cells[0].i = 0; fig[2].sim[4].cells[0].j = 0; //# # # # 
	fig[2].sim[4].cells[1].i = 0; fig[2].sim[4].cells[1].j = 1; //  #
	fig[2].sim[4].cells[2].i = 0; fig[2].sim[4].cells[2].j = 2;
	fig[2].sim[4].cells[3].i = 0; fig[2].sim[4].cells[3].j = 3;
	fig[2].sim[4].cells[4].i = 1; fig[2].sim[4].cells[4].j = 1;

	fig[2].sim[5].cells[0].i = 0; fig[2].sim[5].cells[0].j = 1; //  #
	fig[2].sim[5].cells[1].i = 1; fig[2].sim[5].cells[1].j = 0; //# # # #
	fig[2].sim[5].cells[2].i = 1; fig[2].sim[5].cells[2].j = 1;
	fig[2].sim[5].cells[3].i = 1; fig[2].sim[5].cells[3].j = 2;
	fig[2].sim[5].cells[4].i = 1; fig[2].sim[5].cells[4].j = 3;

	fig[2].sim[6].cells[0].i = 0; fig[2].sim[6].cells[0].j = 2; //	  #
	fig[2].sim[6].cells[1].i = 1; fig[2].sim[6].cells[1].j = 0; //# # # #
	fig[2].sim[6].cells[2].i = 1; fig[2].sim[6].cells[2].j = 1;
	fig[2].sim[6].cells[3].i = 1; fig[2].sim[6].cells[3].j = 2;
	fig[2].sim[6].cells[4].i = 1; fig[2].sim[6].cells[4].j = 3;

	fig[2].sim[7].cells[0].i = 0; fig[2].sim[7].cells[0].j = 0; //# # # # 
	fig[2].sim[7].cells[1].i = 0; fig[2].sim[7].cells[1].j = 1; //    #
	fig[2].sim[7].cells[2].i = 0; fig[2].sim[7].cells[2].j = 2;
	fig[2].sim[7].cells[3].i = 0; fig[2].sim[7].cells[3].j = 3;
	fig[2].sim[7].cells[4].i = 1; fig[2].sim[7].cells[4].j = 2;

	//3. Длинный зигзаг

	fig[3].n = 5;
	fig[3].s = 8;

	fig[3].sim[0].cells[0].i = 0; fig[3].sim[0].cells[0].j = 0; //#
	fig[3].sim[0].cells[1].i = 1; fig[3].sim[0].cells[1].j = 0; //# #
	fig[3].sim[0].cells[2].i = 1; fig[3].sim[0].cells[2].j = 1; //  #
	fig[3].sim[0].cells[3].i = 2; fig[3].sim[0].cells[3].j = 1; //  #
	fig[3].sim[0].cells[4].i = 3; fig[3].sim[0].cells[4].j = 1;

	fig[3].sim[1].cells[0].i = 0; fig[3].sim[1].cells[0].j = 1; //  #
	fig[3].sim[1].cells[1].i = 1; fig[3].sim[1].cells[1].j = 0; //# #
	fig[3].sim[1].cells[2].i = 1; fig[3].sim[1].cells[2].j = 1; //#
	fig[3].sim[1].cells[3].i = 2; fig[3].sim[1].cells[3].j = 0; //#
	fig[3].sim[1].cells[4].i = 3; fig[3].sim[1].cells[4].j = 0;

	fig[3].sim[2].cells[0].i = 0; fig[3].sim[2].cells[0].j = 0; //# 
	fig[3].sim[2].cells[1].i = 1; fig[3].sim[2].cells[1].j = 0; //#
	fig[3].sim[2].cells[2].i = 2; fig[3].sim[2].cells[2].j = 0; //# #
	fig[3].sim[2].cells[3].i = 2; fig[3].sim[2].cells[3].j = 1; //  # 
	fig[3].sim[2].cells[4].i = 3; fig[3].sim[2].cells[4].j = 1;

	fig[3].sim[3].cells[0].i = 0; fig[3].sim[3].cells[0].j = 1; //  # 
	fig[3].sim[3].cells[1].i = 1; fig[3].sim[3].cells[1].j = 1; //  #
	fig[3].sim[3].cells[2].i = 2; fig[3].sim[3].cells[2].j = 0; //# #
	fig[3].sim[3].cells[3].i = 2; fig[3].sim[3].cells[3].j = 1; //#
	fig[3].sim[3].cells[4].i = 3; fig[3].sim[3].cells[4].j = 0;

	fig[3].sim[4].cells[0].i = 0; fig[3].sim[4].cells[0].j = 1; //  # # # 
	fig[3].sim[4].cells[1].i = 0; fig[3].sim[4].cells[1].j = 2; //# #
	fig[3].sim[4].cells[2].i = 0; fig[3].sim[4].cells[2].j = 3;
	fig[3].sim[4].cells[3].i = 1; fig[3].sim[4].cells[3].j = 0;
	fig[3].sim[4].cells[4].i = 1; fig[3].sim[4].cells[4].j = 1;

	fig[3].sim[5].cells[0].i = 0; fig[3].sim[5].cells[0].j = 0; //# #
	fig[3].sim[5].cells[1].i = 0; fig[3].sim[5].cells[1].j = 1; //  # # #
	fig[3].sim[5].cells[2].i = 1; fig[3].sim[5].cells[2].j = 1;
	fig[3].sim[5].cells[3].i = 1; fig[3].sim[5].cells[3].j = 2;
	fig[3].sim[5].cells[4].i = 1; fig[3].sim[5].cells[4].j = 3;

	fig[3].sim[6].cells[0].i = 0; fig[3].sim[6].cells[0].j = 2; //	  # #
	fig[3].sim[6].cells[1].i = 0; fig[3].sim[6].cells[1].j = 3; //# # # 
	fig[3].sim[6].cells[2].i = 1; fig[3].sim[6].cells[2].j = 0;
	fig[3].sim[6].cells[3].i = 1; fig[3].sim[6].cells[3].j = 1;
	fig[3].sim[6].cells[4].i = 1; fig[3].sim[6].cells[4].j = 2;

	fig[3].sim[7].cells[0].i = 0; fig[3].sim[7].cells[0].j = 0; //# # #  
	fig[3].sim[7].cells[1].i = 0; fig[3].sim[7].cells[1].j = 1; //    # #
	fig[3].sim[7].cells[2].i = 0; fig[3].sim[7].cells[2].j = 2;
	fig[3].sim[7].cells[3].i = 1; fig[3].sim[7].cells[3].j = 2;
	fig[3].sim[7].cells[4].i = 1; fig[3].sim[7].cells[4].j = 3;

	//4. Длинный уголок

	fig[4].n = 5;
	fig[4].s = 4;

	fig[4].sim[0].cells[0].i = 0; fig[4].sim[0].cells[0].j = 0; //# # #
	fig[4].sim[0].cells[1].i = 0; fig[4].sim[0].cells[1].j = 1; //#
	fig[4].sim[0].cells[2].i = 0; fig[4].sim[0].cells[2].j = 2; //#
	fig[4].sim[0].cells[3].i = 1; fig[4].sim[0].cells[3].j = 0;
	fig[4].sim[0].cells[4].i = 2; fig[4].sim[0].cells[4].j = 0;

	fig[4].sim[1].cells[0].i = 0; fig[4].sim[1].cells[0].j = 0; //#
	fig[4].sim[1].cells[1].i = 1; fig[4].sim[1].cells[1].j = 0; //#
	fig[4].sim[1].cells[2].i = 2; fig[4].sim[1].cells[2].j = 0; //# # #
	fig[4].sim[1].cells[3].i = 2; fig[4].sim[1].cells[3].j = 1;
	fig[4].sim[1].cells[4].i = 2; fig[4].sim[1].cells[4].j = 2;

	fig[4].sim[2].cells[0].i = 0; fig[4].sim[2].cells[0].j = 2; //    #
	fig[4].sim[2].cells[1].i = 1; fig[4].sim[2].cells[1].j = 2; //    #
	fig[4].sim[2].cells[2].i = 2; fig[4].sim[2].cells[2].j = 0; //# # #
	fig[4].sim[2].cells[3].i = 2; fig[4].sim[2].cells[3].j = 1;
	fig[4].sim[2].cells[4].i = 2; fig[4].sim[2].cells[4].j = 2;

	fig[4].sim[3].cells[0].i = 0; fig[4].sim[3].cells[0].j = 0; //# # #
	fig[4].sim[3].cells[1].i = 0; fig[4].sim[3].cells[1].j = 1; //    #
	fig[4].sim[3].cells[2].i = 0; fig[4].sim[3].cells[2].j = 2; //    #
	fig[4].sim[3].cells[3].i = 1; fig[4].sim[3].cells[3].j = 2;
	fig[4].sim[3].cells[4].i = 2; fig[4].sim[3].cells[4].j = 2;

	//5. Бумеранг

	fig[5].n = 5;
	fig[5].s = 4;

	fig[5].sim[0].cells[0].i = 0; fig[5].sim[0].cells[0].j = 1; //  # #
	fig[5].sim[0].cells[1].i = 0; fig[5].sim[0].cells[1].j = 2; //  #
	fig[5].sim[0].cells[2].i = 1; fig[5].sim[0].cells[2].j = 1; //# #
	fig[5].sim[0].cells[3].i = 2; fig[5].sim[0].cells[3].j = 0;
	fig[5].sim[0].cells[4].i = 2; fig[5].sim[0].cells[4].j = 1;

	fig[5].sim[1].cells[0].i = 0; fig[5].sim[1].cells[0].j = 0; //# #
	fig[5].sim[1].cells[1].i = 0; fig[5].sim[1].cells[1].j = 1; //  #
	fig[5].sim[1].cells[2].i = 1; fig[5].sim[1].cells[2].j = 1; //  # #
	fig[5].sim[1].cells[3].i = 2; fig[5].sim[1].cells[3].j = 1;
	fig[5].sim[1].cells[4].i = 2; fig[5].sim[1].cells[4].j = 2;

	fig[5].sim[2].cells[0].i = 0; fig[5].sim[2].cells[0].j = 0; //#
	fig[5].sim[2].cells[1].i = 1; fig[5].sim[2].cells[1].j = 0; //# # #
	fig[5].sim[2].cells[2].i = 1; fig[5].sim[2].cells[2].j = 1; //    #
	fig[5].sim[2].cells[3].i = 1; fig[5].sim[2].cells[3].j = 2;
	fig[5].sim[2].cells[4].i = 2; fig[5].sim[2].cells[4].j = 2;

	fig[5].sim[3].cells[0].i = 0; fig[5].sim[3].cells[0].j = 2; //    #
	fig[5].sim[3].cells[1].i = 1; fig[5].sim[3].cells[1].j = 0; //# # #
	fig[5].sim[3].cells[2].i = 1; fig[5].sim[3].cells[2].j = 1; //#
	fig[5].sim[3].cells[3].i = 1; fig[5].sim[3].cells[3].j = 2;
	fig[5].sim[3].cells[4].i = 2; fig[5].sim[3].cells[4].j = 0;

	//6. Слон

	fig[6].n = 5;
	fig[6].s = 4;

	fig[6].sim[0].cells[0].i = 0; fig[6].sim[0].cells[0].j = 0; //# # #
	fig[6].sim[0].cells[1].i = 0; fig[6].sim[0].cells[1].j = 1; //  #
	fig[6].sim[0].cells[2].i = 0; fig[6].sim[0].cells[2].j = 2; //  #
	fig[6].sim[0].cells[3].i = 1; fig[6].sim[0].cells[3].j = 1;
	fig[6].sim[0].cells[4].i = 2; fig[6].sim[0].cells[4].j = 1;

	fig[6].sim[1].cells[0].i = 0; fig[6].sim[1].cells[0].j = 1; //  #
	fig[6].sim[1].cells[1].i = 1; fig[6].sim[1].cells[1].j = 1; //  #
	fig[6].sim[1].cells[2].i = 2; fig[6].sim[1].cells[2].j = 0; //# # #
	fig[6].sim[1].cells[3].i = 2; fig[6].sim[1].cells[3].j = 1;
	fig[6].sim[1].cells[4].i = 2; fig[6].sim[1].cells[4].j = 2;

	fig[6].sim[2].cells[0].i = 0; fig[6].sim[2].cells[0].j = 0; //#
	fig[6].sim[2].cells[1].i = 1; fig[6].sim[2].cells[1].j = 0; //# # #
	fig[6].sim[2].cells[2].i = 1; fig[6].sim[2].cells[2].j = 1; //#
	fig[6].sim[2].cells[3].i = 1; fig[6].sim[2].cells[3].j = 2;
	fig[6].sim[2].cells[4].i = 2; fig[6].sim[2].cells[4].j = 0;

	fig[6].sim[3].cells[0].i = 0; fig[6].sim[3].cells[0].j = 2; //    #
	fig[6].sim[3].cells[1].i = 1; fig[6].sim[3].cells[1].j = 0; //# # #
	fig[6].sim[3].cells[2].i = 1; fig[6].sim[3].cells[2].j = 1; //    #
	fig[6].sim[3].cells[3].i = 1; fig[6].sim[3].cells[3].j = 2;
	fig[6].sim[3].cells[4].i = 2; fig[6].sim[3].cells[4].j = 2;

	// 7. Крестик

	fig[7].n = 5;
	fig[7].s = 1;

	fig[7].sim[0].cells[0].i = 0; fig[7].sim[0].cells[0].j = 1; //  #
	fig[7].sim[0].cells[1].i = 1; fig[7].sim[0].cells[1].j = 0; //# # #
	fig[7].sim[0].cells[2].i = 1; fig[7].sim[0].cells[2].j = 1; //  #
	fig[7].sim[0].cells[3].i = 1; fig[7].sim[0].cells[3].j = 2;
	fig[7].sim[0].cells[4].i = 2; fig[7].sim[0].cells[4].j = 1;

	//8. Зигзаг

	fig[8].n = 4;
	fig[8].s = 4;

	fig[8].sim[0].cells[0].i = 0; fig[8].sim[0].cells[0].j = 1; //  # #
	fig[8].sim[0].cells[1].i = 0; fig[8].sim[0].cells[1].j = 2; //# #
	fig[8].sim[0].cells[2].i = 1; fig[8].sim[0].cells[2].j = 0;
	fig[8].sim[0].cells[3].i = 1; fig[8].sim[0].cells[3].j = 1;

	fig[8].sim[1].cells[0].i = 0; fig[8].sim[1].cells[0].j = 0; //# #
	fig[8].sim[1].cells[1].i = 0; fig[8].sim[1].cells[1].j = 1; //  # #
	fig[8].sim[1].cells[2].i = 1; fig[8].sim[1].cells[2].j = 1;
	fig[8].sim[1].cells[3].i = 1; fig[8].sim[1].cells[3].j = 2;

	fig[8].sim[2].cells[0].i = 0; fig[8].sim[2].cells[0].j = 0; //#
	fig[8].sim[2].cells[1].i = 1; fig[8].sim[2].cells[1].j = 0; //# #
	fig[8].sim[2].cells[2].i = 1; fig[8].sim[2].cells[2].j = 1; //  #
	fig[8].sim[2].cells[3].i = 2; fig[8].sim[2].cells[3].j = 1;

	fig[8].sim[3].cells[0].i = 0; fig[8].sim[3].cells[0].j = 1; //  #
	fig[8].sim[3].cells[1].i = 1; fig[8].sim[3].cells[1].j = 0; //# #
	fig[8].sim[3].cells[2].i = 1; fig[8].sim[3].cells[2].j = 1; //#
	fig[8].sim[3].cells[3].i = 2; fig[8].sim[3].cells[3].j = 0;

	//9. Утка

	fig[9].n = 5;
	fig[9].s = 8;

	fig[9].sim[0].cells[0].i = 0; fig[9].sim[0].cells[0].j = 0; //#
	fig[9].sim[0].cells[1].i = 1; fig[9].sim[0].cells[1].j = 0; //# # #
	fig[9].sim[0].cells[2].i = 1; fig[9].sim[0].cells[2].j = 1; //  #
	fig[9].sim[0].cells[3].i = 1; fig[9].sim[0].cells[3].j = 2;
	fig[9].sim[0].cells[4].i = 2; fig[9].sim[0].cells[4].j = 1;

	fig[9].sim[1].cells[0].i = 0; fig[9].sim[1].cells[0].j = 2; //    #
	fig[9].sim[1].cells[1].i = 1; fig[9].sim[1].cells[1].j = 0; //# # #
	fig[9].sim[1].cells[2].i = 1; fig[9].sim[1].cells[2].j = 1; //  #
	fig[9].sim[1].cells[3].i = 1; fig[9].sim[1].cells[3].j = 2;
	fig[9].sim[1].cells[4].i = 2; fig[9].sim[1].cells[4].j = 1;

	fig[9].sim[2].cells[0].i = 0; fig[9].sim[2].cells[0].j = 1; //  # 
	fig[9].sim[2].cells[1].i = 1; fig[9].sim[2].cells[1].j = 0; //# # #
	fig[9].sim[2].cells[2].i = 1; fig[9].sim[2].cells[2].j = 1; //# 
	fig[9].sim[2].cells[3].i = 1; fig[9].sim[2].cells[3].j = 2;
	fig[9].sim[2].cells[4].i = 2; fig[9].sim[2].cells[4].j = 0;

	fig[9].sim[3].cells[0].i = 0; fig[9].sim[3].cells[0].j = 1; //  # 
	fig[9].sim[3].cells[1].i = 1; fig[9].sim[3].cells[1].j = 0; //# # #
	fig[9].sim[3].cells[2].i = 1; fig[9].sim[3].cells[2].j = 1; //    #
	fig[9].sim[3].cells[3].i = 1; fig[9].sim[3].cells[3].j = 2;
	fig[9].sim[3].cells[4].i = 2; fig[9].sim[3].cells[4].j = 2;

	fig[9].sim[4].cells[0].i = 0; fig[9].sim[4].cells[0].j = 1; //  #
	fig[9].sim[4].cells[1].i = 1; fig[9].sim[4].cells[1].j = 0; //# #
	fig[9].sim[4].cells[2].i = 1; fig[9].sim[4].cells[2].j = 1; //  # #
	fig[9].sim[4].cells[3].i = 2; fig[9].sim[4].cells[3].j = 1;
	fig[9].sim[4].cells[4].i = 2; fig[9].sim[4].cells[4].j = 2;

	fig[9].sim[5].cells[0].i = 0; fig[9].sim[5].cells[0].j = 1; //  #
	fig[9].sim[5].cells[1].i = 1; fig[9].sim[5].cells[1].j = 1; //  # #
	fig[9].sim[5].cells[2].i = 1; fig[9].sim[5].cells[2].j = 2; //# #
	fig[9].sim[5].cells[3].i = 2; fig[9].sim[5].cells[3].j = 0;
	fig[9].sim[5].cells[4].i = 2; fig[9].sim[5].cells[4].j = 1;

	fig[9].sim[6].cells[0].i = 0; fig[9].sim[6].cells[0].j = 1; //	# #
	fig[9].sim[6].cells[1].i = 0; fig[9].sim[6].cells[1].j = 2; //# # 
	fig[9].sim[6].cells[2].i = 1; fig[9].sim[6].cells[2].j = 0;	//	#
	fig[9].sim[6].cells[3].i = 1; fig[9].sim[6].cells[3].j = 1;
	fig[9].sim[6].cells[4].i = 2; fig[9].sim[6].cells[4].j = 1;

	fig[9].sim[7].cells[0].i = 0; fig[9].sim[7].cells[0].j = 0; //# #  
	fig[9].sim[7].cells[1].i = 0; fig[9].sim[7].cells[1].j = 1; //  # #
	fig[9].sim[7].cells[2].i = 1; fig[9].sim[7].cells[2].j = 1;//   #
	fig[9].sim[7].cells[3].i = 1; fig[9].sim[7].cells[3].j = 2;
	fig[9].sim[7].cells[4].i = 2; fig[9].sim[7].cells[4].j = 1;

	//10. Усы

	fig[10].n = 5;
	fig[10].s = 4;

	fig[10].sim[0].cells[0].i = 0; fig[10].sim[0].cells[0].j = 0; //#
	fig[10].sim[0].cells[1].i = 1; fig[10].sim[0].cells[1].j = 0; //# #
	fig[10].sim[0].cells[2].i = 1; fig[10].sim[0].cells[2].j = 1; //  # #
	fig[10].sim[0].cells[3].i = 2; fig[10].sim[0].cells[3].j = 1;
	fig[10].sim[0].cells[4].i = 2; fig[10].sim[0].cells[4].j = 2;

	fig[10].sim[1].cells[0].i = 0; fig[10].sim[1].cells[0].j = 2; //    #
	fig[10].sim[1].cells[1].i = 1; fig[10].sim[1].cells[1].j = 1; //  # #
	fig[10].sim[1].cells[2].i = 1; fig[10].sim[1].cells[2].j = 2; //# #
	fig[10].sim[1].cells[3].i = 2; fig[10].sim[1].cells[3].j = 0;
	fig[10].sim[1].cells[4].i = 2; fig[10].sim[1].cells[4].j = 1;

	fig[10].sim[2].cells[0].i = 0; fig[10].sim[2].cells[0].j = 1; //  # #
	fig[10].sim[2].cells[1].i = 0; fig[10].sim[2].cells[1].j = 2; //# #
	fig[10].sim[2].cells[2].i = 1; fig[10].sim[2].cells[2].j = 0; //#
	fig[10].sim[2].cells[3].i = 1; fig[10].sim[2].cells[3].j = 1;
	fig[10].sim[2].cells[4].i = 2; fig[10].sim[2].cells[4].j = 0;

	fig[10].sim[3].cells[0].i = 0; fig[10].sim[3].cells[0].j = 0; //# #
	fig[10].sim[3].cells[1].i = 0; fig[10].sim[3].cells[1].j = 1; //  # #
	fig[10].sim[3].cells[2].i = 1; fig[10].sim[3].cells[2].j = 1; //    #
	fig[10].sim[3].cells[3].i = 1; fig[10].sim[3].cells[3].j = 2;
	fig[10].sim[3].cells[4].i = 2; fig[10].sim[3].cells[4].j = 2;

	//11. Танк

	fig[11].n = 5;
	fig[11].s = 8;

	fig[11].sim[0].cells[0].i = 0; fig[11].sim[0].cells[0].j = 0; //# #
	fig[11].sim[0].cells[1].i = 0; fig[11].sim[0].cells[1].j = 1; //# #
	fig[11].sim[0].cells[2].i = 1; fig[11].sim[0].cells[2].j = 0; //  #
	fig[11].sim[0].cells[3].i = 1; fig[11].sim[0].cells[3].j = 1;
	fig[11].sim[0].cells[4].i = 2; fig[11].sim[0].cells[4].j = 1;

	fig[11].sim[1].cells[0].i = 0; fig[11].sim[1].cells[0].j = 0; //# #
	fig[11].sim[1].cells[1].i = 0; fig[11].sim[1].cells[1].j = 1; //# #
	fig[11].sim[1].cells[2].i = 1; fig[11].sim[1].cells[2].j = 0; //#
	fig[11].sim[1].cells[3].i = 1; fig[11].sim[1].cells[3].j = 1;
	fig[11].sim[1].cells[4].i = 2; fig[11].sim[1].cells[4].j = 0;

	fig[11].sim[2].cells[0].i = 0; fig[11].sim[2].cells[0].j = 1; //  # 
	fig[11].sim[2].cells[1].i = 1; fig[11].sim[2].cells[1].j = 0; //# #
	fig[11].sim[2].cells[2].i = 1; fig[11].sim[2].cells[2].j = 1; //# #
	fig[11].sim[2].cells[3].i = 2; fig[11].sim[2].cells[3].j = 0;
	fig[11].sim[2].cells[4].i = 2; fig[11].sim[2].cells[4].j = 1;

	fig[11].sim[3].cells[0].i = 0; fig[11].sim[3].cells[0].j = 0; //# 
	fig[11].sim[3].cells[1].i = 1; fig[11].sim[3].cells[1].j = 0; //# #
	fig[11].sim[3].cells[2].i = 1; fig[11].sim[3].cells[2].j = 1; //# #
	fig[11].sim[3].cells[3].i = 2; fig[11].sim[3].cells[3].j = 0;
	fig[11].sim[3].cells[4].i = 2; fig[11].sim[3].cells[4].j = 1;

	fig[11].sim[4].cells[0].i = 0; fig[11].sim[4].cells[0].j = 0; //# # #
	fig[11].sim[4].cells[1].i = 0; fig[11].sim[4].cells[1].j = 1; //# #
	fig[11].sim[4].cells[2].i = 0; fig[11].sim[4].cells[2].j = 2;
	fig[11].sim[4].cells[3].i = 1; fig[11].sim[4].cells[3].j = 0;
	fig[11].sim[4].cells[4].i = 1; fig[11].sim[4].cells[4].j = 1;

	fig[11].sim[5].cells[0].i = 0; fig[11].sim[5].cells[0].j = 0; //# #
	fig[11].sim[5].cells[1].i = 0; fig[11].sim[5].cells[1].j = 1; //# # #
	fig[11].sim[5].cells[2].i = 1; fig[11].sim[5].cells[2].j = 0;
	fig[11].sim[5].cells[3].i = 1; fig[11].sim[5].cells[3].j = 1;
	fig[11].sim[5].cells[4].i = 1; fig[11].sim[5].cells[4].j = 2;

	fig[11].sim[6].cells[0].i = 0; fig[11].sim[6].cells[0].j = 0; //# # #
	fig[11].sim[6].cells[1].i = 0; fig[11].sim[6].cells[1].j = 1; //  # # 
	fig[11].sim[6].cells[2].i = 0; fig[11].sim[6].cells[2].j = 2;
	fig[11].sim[6].cells[3].i = 1; fig[11].sim[6].cells[3].j = 1;
	fig[11].sim[6].cells[4].i = 1; fig[11].sim[6].cells[4].j = 2;

	fig[11].sim[7].cells[0].i = 0; fig[11].sim[7].cells[0].j = 1; //  # #  
	fig[11].sim[7].cells[1].i = 0; fig[11].sim[7].cells[1].j = 2; //# # #
	fig[11].sim[7].cells[2].i = 1; fig[11].sim[7].cells[2].j = 0;
	fig[11].sim[7].cells[3].i = 1; fig[11].sim[7].cells[3].j = 1;
	fig[11].sim[7].cells[4].i = 1; fig[11].sim[7].cells[4].j = 2;

	//12. Ворота

	fig[12].n = 5;
	fig[12].s = 4;

	fig[12].sim[0].cells[0].i = 0; fig[12].sim[0].cells[0].j = 0; //# # #
	fig[12].sim[0].cells[1].i = 0; fig[12].sim[0].cells[1].j = 1; //#   #
	fig[12].sim[0].cells[2].i = 0; fig[12].sim[0].cells[2].j = 2;
	fig[12].sim[0].cells[3].i = 1; fig[12].sim[0].cells[3].j = 0;
	fig[12].sim[0].cells[4].i = 1; fig[12].sim[0].cells[4].j = 2;

	fig[12].sim[1].cells[0].i = 0; fig[12].sim[1].cells[0].j = 0; //#   #
	fig[12].sim[1].cells[1].i = 0; fig[12].sim[1].cells[1].j = 2; //# # #
	fig[12].sim[1].cells[2].i = 1; fig[12].sim[1].cells[2].j = 0;
	fig[12].sim[1].cells[3].i = 1; fig[12].sim[1].cells[3].j = 1;
	fig[12].sim[1].cells[4].i = 1; fig[12].sim[1].cells[4].j = 2;

	fig[12].sim[2].cells[0].i = 0; fig[12].sim[2].cells[0].j = 0; //# #
	fig[12].sim[2].cells[1].i = 0; fig[12].sim[2].cells[1].j = 1; //#
	fig[12].sim[2].cells[2].i = 1; fig[12].sim[2].cells[2].j = 0; //# #
	fig[12].sim[2].cells[3].i = 2; fig[12].sim[2].cells[3].j = 0;
	fig[12].sim[2].cells[4].i = 2; fig[12].sim[2].cells[4].j = 1;

	fig[12].sim[3].cells[0].i = 0; fig[12].sim[3].cells[0].j = 0; //# #
	fig[12].sim[3].cells[1].i = 0; fig[12].sim[3].cells[1].j = 1; //  #
	fig[12].sim[3].cells[2].i = 1; fig[12].sim[3].cells[2].j = 1; //# #
	fig[12].sim[3].cells[3].i = 2; fig[12].sim[3].cells[3].j = 0;
	fig[12].sim[3].cells[4].i = 2; fig[12].sim[3].cells[4].j = 1;

	//12. Средняя палка
	fig[13].n = 4;
	fig[13].s = 2;

	fig[13].sim[0].cells[0].i = 0; fig[13].sim[0].cells[0].j = 0; //#
	fig[13].sim[0].cells[1].i = 1; fig[13].sim[0].cells[1].j = 0; //#
	fig[13].sim[0].cells[2].i = 2; fig[13].sim[0].cells[2].j = 0; //#
	fig[13].sim[0].cells[3].i = 3; fig[13].sim[0].cells[3].j = 0; //#

	fig[13].sim[1].cells[0].i = 0; fig[13].sim[1].cells[0].j = 0; //# # # #
	fig[13].sim[1].cells[1].i = 0; fig[13].sim[1].cells[1].j = 1;
	fig[13].sim[1].cells[2].i = 0; fig[13].sim[1].cells[2].j = 2;
	fig[13].sim[1].cells[3].i = 0; fig[13].sim[1].cells[3].j = 3;

	//14. Конь

	fig[14].n = 4;
	fig[14].s = 8;

	fig[14].sim[0].cells[0].i = 0; fig[14].sim[0].cells[0].j = 0; //# #
	fig[14].sim[0].cells[1].i = 0; fig[14].sim[0].cells[1].j = 1; //#
	fig[14].sim[0].cells[2].i = 1; fig[14].sim[0].cells[2].j = 0; //#
	fig[14].sim[0].cells[3].i = 2; fig[14].sim[0].cells[3].j = 0;

	fig[14].sim[1].cells[0].i = 0; fig[14].sim[1].cells[0].j = 0; //# #
	fig[14].sim[1].cells[1].i = 0; fig[14].sim[1].cells[1].j = 1; //  #
	fig[14].sim[1].cells[2].i = 1; fig[14].sim[1].cells[2].j = 1; //  #
	fig[14].sim[1].cells[3].i = 2; fig[14].sim[1].cells[3].j = 1;

	fig[14].sim[2].cells[0].i = 0; fig[14].sim[2].cells[0].j = 1; //  # 
	fig[14].sim[2].cells[1].i = 1; fig[14].sim[2].cells[1].j = 1; //  #
	fig[14].sim[2].cells[2].i = 2; fig[14].sim[2].cells[2].j = 0; //# #
	fig[14].sim[2].cells[3].i = 2; fig[14].sim[2].cells[3].j = 1;

	fig[14].sim[3].cells[0].i = 0; fig[14].sim[3].cells[0].j = 0; //# 
	fig[14].sim[3].cells[1].i = 1; fig[14].sim[3].cells[1].j = 0; //#
	fig[14].sim[3].cells[2].i = 2; fig[14].sim[3].cells[2].j = 0; //# #
	fig[14].sim[3].cells[3].i = 2; fig[14].sim[3].cells[3].j = 1;

	fig[14].sim[4].cells[0].i = 0; fig[14].sim[4].cells[0].j = 0; //# # #
	fig[14].sim[4].cells[1].i = 0; fig[14].sim[4].cells[1].j = 1; //#
	fig[14].sim[4].cells[2].i = 0; fig[14].sim[4].cells[2].j = 2;
	fig[14].sim[4].cells[3].i = 1; fig[14].sim[4].cells[3].j = 0;

	fig[14].sim[5].cells[0].i = 0; fig[14].sim[5].cells[0].j = 0; //#
	fig[14].sim[5].cells[1].i = 1; fig[14].sim[5].cells[1].j = 0; //# # #
	fig[14].sim[5].cells[2].i = 1; fig[14].sim[5].cells[2].j = 1;
	fig[14].sim[5].cells[3].i = 1; fig[14].sim[5].cells[3].j = 2;

	fig[14].sim[6].cells[0].i = 0; fig[14].sim[6].cells[0].j = 0; //# # #
	fig[14].sim[6].cells[1].i = 0; fig[14].sim[6].cells[1].j = 1; //    # 
	fig[14].sim[6].cells[2].i = 0; fig[14].sim[6].cells[2].j = 2;
	fig[14].sim[6].cells[3].i = 1; fig[14].sim[6].cells[3].j = 2;

	fig[14].sim[7].cells[0].i = 0; fig[14].sim[7].cells[0].j = 2; //    #  
	fig[14].sim[7].cells[1].i = 1; fig[14].sim[7].cells[1].j = 0; //# # #
	fig[14].sim[7].cells[2].i = 1; fig[14].sim[7].cells[2].j = 1;
	fig[14].sim[7].cells[3].i = 1; fig[14].sim[7].cells[3].j = 2;

	//15. Cлоненок

	fig[15].n = 4;
	fig[15].s = 4;

	fig[15].sim[0].cells[0].i = 0; fig[15].sim[0].cells[0].j = 0; //# # #
	fig[15].sim[0].cells[1].i = 0; fig[15].sim[0].cells[1].j = 1; //  #
	fig[15].sim[0].cells[2].i = 0; fig[15].sim[0].cells[2].j = 2;
	fig[15].sim[0].cells[3].i = 1; fig[15].sim[0].cells[3].j = 1;

	fig[15].sim[1].cells[0].i = 0; fig[15].sim[1].cells[0].j = 1; //  #
	fig[15].sim[1].cells[1].i = 1; fig[15].sim[1].cells[1].j = 0; //# # #
	fig[15].sim[1].cells[2].i = 1; fig[15].sim[1].cells[2].j = 1;
	fig[15].sim[1].cells[3].i = 1; fig[15].sim[1].cells[3].j = 2;

	fig[15].sim[2].cells[0].i = 0; fig[15].sim[2].cells[0].j = 0; //#
	fig[15].sim[2].cells[1].i = 1; fig[15].sim[2].cells[1].j = 0; //# #
	fig[15].sim[2].cells[2].i = 1; fig[15].sim[2].cells[2].j = 1; //#
	fig[15].sim[2].cells[3].i = 2; fig[15].sim[2].cells[3].j = 0;

	fig[15].sim[3].cells[0].i = 0; fig[15].sim[3].cells[0].j = 1; //  #
	fig[15].sim[3].cells[1].i = 1; fig[15].sim[3].cells[1].j = 0; //# #
	fig[15].sim[3].cells[2].i = 1; fig[15].sim[3].cells[2].j = 1; //  #
	fig[15].sim[3].cells[3].i = 2; fig[15].sim[3].cells[3].j = 1;

	//16. Кубик

	fig[16].n = 4;
	fig[16].s = 1;

	fig[16].sim[0].cells[0].i = 0; fig[16].sim[0].cells[0].j = 0; //# #
	fig[16].sim[0].cells[1].i = 0; fig[16].sim[0].cells[1].j = 1; //# #
	fig[16].sim[0].cells[2].i = 1; fig[16].sim[0].cells[2].j = 0;
	fig[16].sim[0].cells[3].i = 1; fig[16].sim[0].cells[3].j = 1;

	//17. Младшая палка
	fig[17].n = 3;
	fig[17].s = 2;

	fig[17].sim[0].cells[0].i = 0; fig[17].sim[0].cells[0].j = 0; //#
	fig[17].sim[0].cells[1].i = 1; fig[17].sim[0].cells[1].j = 0; //#
	fig[17].sim[0].cells[2].i = 2; fig[17].sim[0].cells[2].j = 0; //#

	fig[17].sim[1].cells[0].i = 0; fig[17].sim[1].cells[0].j = 0; //# # #
	fig[17].sim[1].cells[1].i = 0; fig[17].sim[1].cells[1].j = 1;
	fig[17].sim[1].cells[2].i = 0; fig[17].sim[1].cells[2].j = 2;

	//18. Уголок

	fig[18].n = 3;
	fig[18].s = 4;

	fig[18].sim[0].cells[0].i = 0; fig[18].sim[0].cells[0].j = 0; //# #
	fig[18].sim[0].cells[1].i = 0; fig[18].sim[0].cells[1].j = 1; //#
	fig[18].sim[0].cells[2].i = 1; fig[18].sim[0].cells[2].j = 0;

	fig[18].sim[1].cells[0].i = 0; fig[18].sim[1].cells[0].j = 0; //# #
	fig[18].sim[1].cells[1].i = 0; fig[18].sim[1].cells[1].j = 1; //  #
	fig[18].sim[1].cells[2].i = 1; fig[18].sim[1].cells[2].j = 1;

	fig[18].sim[2].cells[0].i = 0; fig[18].sim[2].cells[0].j = 1; //  #
	fig[18].sim[2].cells[1].i = 1; fig[18].sim[2].cells[1].j = 0; //# #
	fig[18].sim[2].cells[2].i = 1; fig[18].sim[2].cells[2].j = 1;

	fig[18].sim[3].cells[0].i = 0; fig[18].sim[3].cells[0].j = 0; //#
	fig[18].sim[3].cells[1].i = 1; fig[18].sim[3].cells[1].j = 0; //# #
	fig[18].sim[3].cells[2].i = 1; fig[18].sim[3].cells[2].j = 1;

	//19. Пенек
	fig[19].n = 2;
	fig[19].s = 2;

	fig[19].sim[0].cells[0].i = 0; fig[19].sim[0].cells[0].j = 0; //#
	fig[19].sim[0].cells[1].i = 1; fig[19].sim[0].cells[1].j = 0; //#

	fig[19].sim[1].cells[0].i = 0; fig[19].sim[1].cells[0].j = 0; //# #
	fig[19].sim[1].cells[1].i = 0; fig[19].sim[1].cells[1].j = 1;

	//20. Точка
	fig[20].n = 1;
	fig[20].s = 1;

	fig[20].sim[0].cells[0].i = 0; fig[20].sim[0].cells[0].j = 0; //#
}

void swap(tcoord *a, tcoord *b)
{
	tcoord t = *a;
	*a = *b;
	*b = t;
}


int recognize_fig(struct tmove move)
{
	int mini = 100, minj = 100, i, j;

	for (i = 0; i < move.amount; i++)
	{
		if (move.a[i].i < mini)
			mini = move.a[i].i;

		if (move.a[i].j < minj)
			minj = move.a[i].j;
	}

	for (i = 0; i < move.amount; i++)
	{
		move.a[i].i -= mini;
		move.a[i].j -= minj;
	}

	for (i = 0; i < move.amount - 1; i++)
		for (j = 0; j < move.amount - i - 1; j++)
			if (move.a[j].i > move.a[j + 1].i || move.a[j].i == move.a[j + 1].i && move.a[j].j > move.a[j + 1].j)
				swap(&(move.a[j]), &(move.a[j + 1]));

	/*for (i = 0; i < move.amount; i++)
	printf("%d:%d ", figs[20].sim[0].cells[i].i, figs[20].sim[0].cells[i].j);*/

	for (i = 0; i < FIGAMOUNT; i++)
		if (move.amount == figs[i].n)
			for (j = 0; j < figs[i].s; j++)
				if (memcmp(move.a, &(figs[i].sim[j]), sizeof move.a[0] * move.amount) == 0)
					return i;
}


int figures_output()
{
	struct tfig f[21];
	int i, j, k, l, m;

	init_fig(f);

	for (i = 11; i < 21; i++) {
		printf("figure %d\n", i);

		for (j = 0; j < f[i].s; j++) {
			k = 0;

			for (l = 0; l < f[i].n; l++) {
				for (m = 0; m < f[i].n; m++)
					if (k < f[i].n && f[i].sim[j].cells[k].i == l && f[i].sim[j].cells[k].j == m) {
						printf("#");
						k++;
					}
					else
						printf(".");

				printf("\n");
			}

			printf("\n");
		}
		printf("\n");
	}

	return 0;
}
