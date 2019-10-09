#define true (-1)
#define false (0)
#define tonnes (0)

#define maxlen (20) /* Length of strings */

typedef int boolean;
typedef unsigned char uint8;
typedef unsigned short uint16;
typedef signed short int16;
typedef signed long int32;

typedef uint16 uint;

typedef int planetnum;


typedef struct
{ uint8 a,b,c,d;
} fastseedtype;  /* four byte random number used for planet description */


typedef struct
{ uint16 w0;
  uint16 w1;
  uint16 w2;
} seedtype;  /* six byte random number used as seed for planets */

typedef struct
{	 uint x;
   uint y;       /* One byte unsigned */
   uint economy; /* These two are actually only 0-7  */
   uint govtype;   
   uint techlev; /* 0-16 i think */
   uint population;   /* One byte */
   uint productivity; /* Two byte */
   uint radius; /* Two byte (not used by game at all) */
	fastseedtype	goatsoupseed;
   char name[12];
} plansys ;

#define galsize (256)
#define AlienItems (16)
#define lasttrade AlienItems

#define numforLave 7       /* Lave is 7th generated planet in galaxy one */
#define numforZaonce 129
#define numforDiso 147
#define numforRied 46

plansys galaxy[galsize]; /* Need 0 to galsize-1 inclusive */

seedtype seed;

fastseedtype rnd_seed;

boolean nativerand;

typedef struct
{                         /* In 6502 version these were: */
   uint baseprice;        /* one byte */
   int16 gradient;   /* five bits plus sign */
   uint basequant;        /* one byte */
   uint maskbyte;         /* one byte */
   uint units;            /* two bits */
   char   name[20];         /* longest="Radioactives" */
  } tradegood ;


typedef struct
{	uint quantity[lasttrade+1];
  uint price[lasttrade+1];
} markettype ;

/* Player workspace */
uint     shipshold[lasttrade+1];  /* Contents of cargo bay */
planetnum  currentplanet;           /* Current planet */
uint     galaxynum;               /* Galaxy number (1-8) */
int32    cash;
uint     fuel;
markettype localmarket;
uint     holdspace;

int fuelcost =2; /* 0.2 CR/Light year */
int maxfuel =70; /* 7.0 LY tank */

const uint16 base0=0x5A4A;
const uint16 base1=0x0248;
const uint16 base2=0xB753;  /* Base seed for galaxy 1 */


//static const char *digrams=
//							 "ABOUSEITILETSTONLONUTHNO"
//							 "ALLEXEGEZACEBISO"
//							 "USESARMAINDIREA?"
//							 "ERATENBERALAVETI"
//							 "EDORQUANTEISRION";


#if 0 // 1.4-
char pairs0[]="ABOUSEITILETSTONLONUTHNO";
/* must continue into .. */
char pairs[] = "..LEXEGEZACEBISO"
               "USESARMAINDIREA."
               "ERATENBERALAVETI"
               "EDORQUANTEISRION"; /* Dots should be nullprint characters */


#else // 1.5 planet names fix
char pairs0[]=
"ABOUSEITILETSTONLONUTHNOALLEXEGEZACEBISOUSESARMAINDIREA.ERATENBERALAVETIEDORQUANTEISRION";

char pairs[] = "..LEXEGEZACEBISO"
               "USESARMAINDIREA."
               "ERATENBERALAVETI"
               "EDORQUANTEISRION"; /* Dots should be nullprint characters */

#endif






char govnames[][maxlen]={"Anarchy","Feudal","Multi-gov","Dictatorship",
                    "Communist","Confederacy","Democracy","Corporate State"};

char econnames[][maxlen]={"Rich Ind","Average Ind","Poor Ind","Mainly Ind",
                      "Mainly Agri","Rich Agri","Average Agri","Poor Agri"};


char unitnames[][5] ={"t","kg","g"};

/* Data for DB's price/availability generation system */
/*                   Base  Grad Base Mask Un   Name
                     price ient quant     it              */ 

#define POLITICALLY_CORRECT	0
/* Set to 1 for NES-sanitised trade goods */

tradegood commodities[]=
                   {
                    {0x13,-0x02,0x06,0x01,0,"Food        "},
                    {0x14,-0x01,0x0A,0x03,0,"Textiles    "},
                    {0x41,-0x03,0x02,0x07,0,"Radioactives"},
#if POLITICALLY_CORRECT
                    {0x28,-0x05,0xE2,0x1F,0,"Robot Slaves"},
                    {0x53,-0x05,0xFB,0x0F,0,"Beverages   "},
#else
                    {0x28,-0x05,0xE2,0x1F,0,"Slaves      "},
                    {0x53,-0x05,0xFB,0x0F,0,"Liquor/Wines"},
#endif 
                    {0xC4,+0x08,0x36,0x03,0,"Luxuries    "},
#if POLITICALLY_CORRECT
                    {0xEB,+0x1D,0x08,0x78,0,"Rare Species"},
#else
                    {0xEB,+0x1D,0x08,0x78,0,"Narcotics   "},
#endif 
                    {0x9A,+0x0E,0x38,0x03,0,"Computers   "},
                    {0x75,+0x06,0x28,0x07,0,"Machinery   "},
                    {0x4E,+0x01,0x11,0x1F,0,"Alloys      "},
                    {0x7C,+0x0d,0x1D,0x07,0,"Firearms    "},
                    {0xB0,-0x09,0xDC,0x3F,0,"Furs        "},
                    {0x20,-0x01,0x35,0x03,0,"Minerals    "},
                    {0x61,-0x01,0x42,0x07,1,"Gold        "},
                    {0xAB,-0x02,0x37,0x1F,1,"Platinum    "},
                    {0x2D,-0x01,0xFA,0x0F,2,"Gem-Strones "},
                    {0x35,+0x0F,0xC0,0x07,0,"Alien Items "},
                   };

/**-Required data for text interface **/
char tradnames[lasttrade][maxlen]; /* Tradegood names used in text commands
                                      Set using commodities array */


void goat_soup(const char *source,plansys * psy);


#define nocomms (14)

boolean dobuy(char *);
boolean dosell(char *);
boolean dofuel(char *);
boolean dojump(char *);
boolean docash(char *);
boolean domkt(char *);
boolean dohelp(char *);
boolean dohold(char *);
boolean dosneak(char *);
boolean dolocal(char *);
boolean doinfo(char *);
boolean dogalhyp(char *);
boolean doquit(char *);
boolean dotweakrand(char *);

char commands[nocomms][maxlen]=
  {"buy",        "sell",     "fuel",     "jump",
   "cash",       "mkt",      "help",     "hold",
   "sneak",      "local",    "info",     "galhyp",
	 "quit",       "rand"	
  };

boolean (*comfuncs[nocomms])(char *)=
   {dobuy,         dosell,       dofuel,    dojump,
    docash,        domkt,        dohelp,    dohold,
    dosneak,       dolocal,      doinfo,    dogalhyp,
		doquit,				 dotweakrand
  };  

/**- General functions **/


void port_srand(unsigned int);
int port_rand(void);

static unsigned int lastrand = 0;
