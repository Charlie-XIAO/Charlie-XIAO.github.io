\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{resume}[2015/05/25 An elegant Résumé class]
\LoadClass[10pt]{article}
\RequirePackage{xifthen}

% Chinese support (optional)
\newif\ifzh
\DeclareOption{zh}{\zhtrue}
\ProcessOptions\relax

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Required packages                                                            %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\RequirePackage{xltxtra}
\RequirePackage{progressbar}
\RequirePackage[hidelinks]{hyperref}
\RequirePackage{url}
\RequirePackage{fontawesome5}
\RequirePackage{fontspec}
\RequirePackage{ulem}
\RequirePackage{titlesec}
\RequirePackage{enumitem}
\RequirePackage{amsmath}
\RequirePackage{amssymb}
\RequirePackage[super]{nth}

\RequirePackage[
  a4paper,
  left=0.3in,
  right=0.3in,
  top=0.6in,
  bottom=0.6in,
  nohead
]{geometry}

\ifzh
  \RequirePackage{ctex}
  \renewcommand{\baselinestretch}{1.0}
  \selectfont
\fi

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Font settings                                                                %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\setmainfont[
  Path=fonts/Main/,
  Extension=.otf,
  UprightFont=*-regular,
  BoldFont=*-bold,
  ItalicFont=*-italic,
  BoldItalicFont=*-bolditalic,
  SmallCapsFont=Fontin-SmallCaps
]{texgyretermes}

\ifzh
  \setCJKmainfont[
    Path=fonts/Main/,
    Extension=.ttf,
    UprightFont=*-Regular,
    BoldFont=*-SemiBold,
    ItalicFont=*-Regular,
    BoldItalicFont=*-SemiBold,
    SmallCapsFont=*-Medium,
    Scale=0.9,
  ]{NotoSansSC}
\fi

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Other general settings                                                       %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\setlength{\parindent}{0pt} % Disable indentation globally
\setlist{noitemsep} % No spacing between items but leave space around whole list
\setlist[itemize]{leftmargin=1.0pc} % itemize should use bullet
\setlist[enumerate]{leftmargin=1.5pc} % enumerate should use [arabic]
\urlstyle{tt}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Custom commands                                                              %
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\titleformat{\section}
  {\fontsize{12}{12}\selectfont\scshape\raggedright}
  {}{0em}
  {}
  [\titlerule]
\titlespacing*{\section}{0cm}{*2}{*1.5}

\titleformat{\subsection}
  {\fontsize{11}{11}\selectfont\raggedright}
  {}{0em}
  {}
\titlespacing*{\subsection}{0cm}{*1.5}{*0.3}

\newcommand{\commentedsection}[2]{\section[#1]{#1 \hfill \small{#2}}}
\newcommand{\datedsubsection}[2]{\subsection[#1]{#1 \hfill \small{#2}}}
\newcommand{\datedline}[2]{{\par #1 \hfill #2 \par}}

\newcommand{\advisor}[2]{
  \vspace*{-0.5mm}
  \ifzh
    \textsc{指导教授:} #1, \href{mailto:#2}{#2}%
  \else
    \textsc{Advisor:} #1, \href{mailto:#2}{#2}%
  \fi
}

\newcommand{\skills}[1]{
  \vspace*{-0.5mm}
  \ifzh
    \textsc{技能:} #1%
  \else
    \textsc{Skills:} #1%
  \fi
}

\newcommand{\name}[1]{
  \centerline{\Huge\scshape{#1}}
  \vspace{1.25ex}
}

\newcommand{\email}[1]{\faEnvelope\ \href{mailto:#1}{#1}}
\newcommand{\phone}[1]{{#1}}
\newcommand{\linkedin}[2][]{\faLinkedin\
  \ifthenelse{\isempty{#1}}%
    {\href{#2}{#2}}
    {\href{#2}{#1}}}
\newcommand{\github}[2][]{\faGithub\
  \ifthenelse{\isempty{#1}}%
    {\href{#2}{#2}}
    {\href{#2}{#1}}}
\newcommand{\homepage}[2][]{\faHome\
  \ifthenelse{\isempty{#1}}%
    {\href{#2}{#2}}
    {\href{#2}{#1}}}

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
