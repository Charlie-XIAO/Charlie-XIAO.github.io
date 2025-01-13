\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[2015/05/25 An elegant Résumé class]
\LoadClass[10pt]{article}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%                                                       %
% NOTE: THERE ARE HARDCODED PATHS IN THIS FILE FOR      %
% REUSE IN OTHER DIRECTORIES (OR PATHS MAY NOT BE       %
% CORRECTLY LOADED). THEREFORE, THESE SHOULD NEVER BE   %
% MOVED WITHOUT TAKING CARE OF ALL DEPENDENT PROJECTS.  %
%                                                       %
% TO USE THIS RESUME CLASS, USE THE FOLLOWING IN THE    %
% DOCUMENTCLASS COMMAND:                                %
% D:/Charlie-XIAO.github.io/assets/pdf/yxiao-cv/resume  %
%                                                       %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% disable indent globally
\setlength{\parindent}{0pt}
% some general improvements, defines the XeTeX logo
\RequirePackage{xltxtra}
% use xifthen
\RequirePackage{xifthen}
% use progress bar for skill
\RequirePackage{progressbar}
% use hyperlink for email and url
\RequirePackage[hidelinks]{hyperref}
\RequirePackage{url}
\urlstyle{tt}
% use fontawesome
\RequirePackage{fontawesome5}
% use xcolor for customizing color
%\RequirePackage[usenames,dvipsnames]{xcolor}
% loading fonts
\RequirePackage{fontspec}
% Main document font
\setmainfont[
  Path = fonts/Main/ ,
  Extension = .otf ,
  UprightFont = *-regular ,
  BoldFont = *-bold ,
  ItalicFont = *-italic ,
  BoldItalicFont = *-bolditalic ,
  SmallCapsFont = Fontin-SmallCaps
]{texgyretermes}

\RequirePackage[
    a4paper,
    left=0.3in,
    right=0.3in,
    top=0.5in,
    bottom=0.5in,
    nohead
]{geometry}

\RequirePackage{ulem}
\RequirePackage{titlesec}
\RequirePackage{enumitem}
\setlist{noitemsep} % removes spacing from items but leaves space around the whole list
%\setlist{nosep} % removes all vertical spacing within and around the list
\setlist[itemize]{leftmargin=1.0pc} % itemize should use bullet
\setlist[enumerate]{leftmargin=1.5pc} % enumerate should use [arabic]
\RequirePackage[super]{nth}

% Math
\RequirePackage{amsmath}
\RequirePackage{amssymb}

\titleformat{\section}         % Customise the \section command 
  {\fontsize{12}{12}\selectfont\scshape\raggedright} % Make the \section headers large (\large),
                               % small capitals (\scshape) and left aligned (\raggedright)
  {}{0em}                      % Can be used to give a prefix to all sections, like 'Section ...'
  {}                           % Can be used to insert code before the heading
  [\titlerule]                 % Inserts a horizontal line after the heading
\titlespacing*{\section}{0cm}{*2}{*1.5}

\titleformat{\subsection}
  {\fontsize{11}{11}\selectfont\raggedright}
  {}{0em}
  {}
\titlespacing*{\subsection}{0cm}{*1.5}{*0.3}

\newcommand{\commentedsection}[2]{%
  \section[#1]{#1 \hfill \small{#2}}%
}
\newcommand{\datedsubsection}[2]{%
  \subsection[#1]{#1 \hfill \small{#2}}%
}
\newcommand{\datedline}[2]{%
  {\par #1 \hfill #2 \par}%
}

\newcommand{\advisor}[2]{
  \vspace*{-0.5mm}
  \textsc{Advisor:} #1, \href{mailto:#2}{#2}
}

\newcommand{\skills}[1]{
  \vspace*{-0.5mm}
  \textsc{Skills:} #1
}

\newcommand{\name}[1]{
  \centerline{\Huge\scshape{#1}}
  \vspace{1.25ex}
}

% defines one's name
% usage: \name{<name>}
\newcommand{\nameTest}[1]{
  {\large\scshape{#1}}
}

% defines one's email
% usage: \email{<email>}
\newcommand{\email}[1]{\faEnvelope\ \href{mailto:#1}{#1}}
% defines one's phone
% usage: \phone{<phone>}
\newcommand{\phone}[1]{{#1}}
% defines one's linkedin
% usage: \linkedin{<linkedin>}
\newcommand{\linkedin}[2][]{\faLinkedin\ 
  \ifthenelse{\isempty{#1}}%
    {\href{#2}{#2}}
    {\href{#2}{#1}}}
% defines one's GitHub
% usage: \github{<github>}
\newcommand{\github}[2][]{\faGithub\ 
  \ifthenelse{\isempty{#1}}%
    {\href{#2}{#2}}
    {\href{#2}{#1}}}
% defines one's homepage
% usage: \homepage{<homepage>}
\newcommand{\homepage}[2][]{\faHome\
  \ifthenelse{\isempty{#1}}%
    {\href{#2}{#2}}
    {\href{#2}{#1}}}

% defines progress bar with text
% usage: \pbar[3][width]{Text}{percentage}
\newcommand{\pbar}[3][10em]{{#2}\ 
  \progressbar[heightr=1, width=#1, borderwidth=0pt, roundnessr=0.45, filledcolor=green!40, subdivisions=1]{#3}
}

\newcommand{\basicInfo}[1]{
  \centerline{\sffamily{#1}}
  \vspace{1.5ex}
}

\newcommand{\role}[2]{
  {\par \textit{#1} ~ #2 \par}
  \vspace{0.85ex}
}

\definecolor{darkblue}{rgb}{0.0, 0.0, 0.6}

\let\legacyhref\href
\renewcommand{\href}[2]{\legacyhref{#1}{\textcolor{darkblue}{#2}}}

% Uncomment the following to deactivate links in case some companies do not allow links in CV
% \renewcommand{\href}[2]{\textcolor{darkblue}{#2}}
